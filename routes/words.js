const express = require("express");
const connection = require("../database/crudrepository.js");
const router = express.Router();
const Validator = require("jsonschema").Validator;
const validator = new Validator();
/**
 * Processes requests to /words.
 * @author Atte Ala-Lahti
 * @module
 */
/**
 * Attempts to get all word pairs from the database to send them to the requester.
 * All sent word pairs' languages will be in the same order.
 * If both from and to parameters are defined in the request, only word pairs from the specified languages will be returned.
 * @author Atte Ala-Lahti
 * @name GET request
 * @example GET /words?from=finnish&to=english
 * @function
 * @param {String} [from] - Which language the words are supposed to be translated from.
 * @param {String} [to] - Which language the words are supposed to be translated to.
 * @returns {Array<Object>} Wanted word pairs with languages in the same order, or an error.
 */
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
                        language1_id: word.language2_id,
                        language2_id: word.language1_id,
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
/**
 * Schema for validating POST requests.
 */
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
/**
 * Attempts to save a word pair to the database.
 * Sends back an error if the given word pair object does not have the right kind of data in the right fields.
 * @author Atte Ala-Lahti
 * @name POST request
 * @function
 * @param {Object} req.body - Word pair to be saved.
 * @returns {Object} The saved word pair with id from the database added, or an error.
 */
router.post("/", async (req, res) => {
    const validation = validator.validate(req.body, postSchema);
    if (validation.errors.length > 0) {
        res.status(400).send(validation.errors);
    } else {
        try {
            let id = await connection.saveWordPair(req.body);
            res.status(201).send({ ...req.body, id: id });
        } catch (error) {
            res.status(500).send(error);
        }
    }
});
/**
 * Attempts to delete a word pair with a given id from the database.
 * Sends back a 404 error if nothing was deleted.
 * @author Atte Ala-Lahti
 * @name DELETE request
 * @example DELETE /words/1
 * @function
 * @param {Number} id - Id of the word pair to be deleted.
 * @returns {status} 204 status, or an error.
 */
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
/**
 * Schema for validating PATCH requests.
 */
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
/**
 * Attempts to update a word pair in the database.
 * Sends back an error if the given word pair object does not have the right kind of data in the right fields.
 * Will only update the translations of the word, not which languages the words are in.
 * @author Atte Ala-Lahti
 * @name PATCH request
 * @function
 * @param {Object} req.body - Word pair to be updated.
 * @returns {status} 200 if something changed, 204 if nothing changed, or an error.
 */
router.patch("/", async (req, res) => {
    const validation = validator.validate(req.body, patchSchema);
    if (validation.errors.length > 0) {
        res.status(400).send(validation.errors);
    } else {
        try {
            // First get the word pair as it is in the database to find out which way round the languages are.
            let currentWordPair = (await connection.findWordPairById(req.body.id))[0];
            let newWordPair;
            // Flip the languages of the given word pair around if they are not in the same order as they are in the database.
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
                res.sendStatus(200);
            } else {
                res.sendStatus(204);
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }
});
module.exports = router;
