const express = require("express");
const connection = require("../database/crudrepository.js");
const router = express.Router();
const Validator = require("jsonschema").Validator;
const validator = new Validator();

router.get("/", async (req, res) => {
    try {
        if (req.query.to && req.query.from) {
            let words = await connection.findWordPairsByLanguages(
                req.query.from,
                req.query.to
            );
            let reorderedWords = [];
            // Flip languages around if necessary to keep languages "from" and "to" consistent
            words.forEach((word) => {
                if (word.language1.toLowerCase() === req.query.from) {
                    reorderedWords.push(word);
                } else {
                    reorderedWords.push({
                        ...word,
                        language1: word.language2,
                        language2: word.language1,
                        word_in_language1: word.word_in_language2,
                        word_in_language2: word.word_in_language1,
                    });
                }
            });
            res.send(reorderedWords);
        } else {
            let allWords = await connection.findAllWordPairs();
            res.send(allWords);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});
const schema = {
    type: "object",
    properties: {
        language1_id: { type: "number", min: 0 },
        language2_id: { type: "number", min: 0 },
        word_in_language1: { type: "string" },
        word_in_language2: { type: "string" },
    },
    required: ["language1_id", "language2_id", "word_in_language1", "word_in_language2"],
};
router.post("/", async (req, res) => {
    const validation = validator.validate(req.body, schema);
    if (validation.errors.length > 0) {
        res.status(400).send(validation.errors);
    } else {
        try {
            await connection.saveWordPair(req.body);
            res.status(201).send(req.body);
        } catch (error) {
            res.status(500).send(error);
        }
    }
});
router.delete("/:id([0-9]+)", async (req, res) => {
    try {
        let info = await connection.deleteWordPairById(req.params.id);
        if (info.affectedRows > 0) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
