const express = require("express");
const connection = require("../database/crudrepository.js");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        if (req.query.to && req.query.from) {
            let words = await connection.findByLanguages(req.query.from, req.query.to);
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
            let allWords = await connection.findAll();
            res.send(allWords);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});
router.post("/", async (req, res) => {
    await connection.save(req.body);
    res.status(201).send(req.body);
});

module.exports = router;
