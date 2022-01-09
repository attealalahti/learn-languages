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
                if (word.language1.toLowerCase() === req.query.from.toLowerCase()) {
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
const postSchema = {
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
    const validation = validator.validate(req.body, postSchema);
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
const patchSchema = {
    type: "object",
    properties: {
        id: { type: "number", min: 0 },
        language1_id: { type: "number", min: 0 },
        language2_id: { type: "number", min: 0 },
        word_in_language1: { type: "string" },
        word_in_language2: { type: "string" },
    },
    required: [
        "id",
        "language1_id",
        "language2_id",
        "word_in_language1",
        "word_in_language2",
    ],
};
router.patch("/", async (req, res) => {
    const validation = validator.validate(req.body, patchSchema);
    if (validation.errors.length > 0) {
        res.status(400).send(validation.errors);
    } else {
        try {
            let currentWordPair = (await connection.findWordPairById(req.body.id))[0];
            let newWordPair;
            if (req.body.language1_id === currentWordPair.language1_id) {
                newWordPair = req.body;
            } else {
                newWordPair = {
                    id: req.body.id,
                    language1_id: req.body.language2_id,
                    language2_id: req.body.language1_id,
                    word_in_language1: req.body.word_in_language2,
                    word_in_language2: req.body.word_in_language1,
                };
            }
            let info = await connection.updateWordPair(newWordPair);
            if (info.changedRows > 0) {
                res.status(201).send(newWordPair);
            } else {
                res.sendStatus(204);
            }
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
});

module.exports = router;
