const express = require("express");
const connection = require("../database/crudrepository.js");
const router = express.Router();
const Validator = require("jsonschema").Validator;
const validator = new Validator();
/**
 * Processes requests to /languages.
 * @author Atte Ala-Lahti
 * @module
 */
/**
 * Attempts to get all languages from the database to send them to the requester.
 * @author Atte Ala-Lahti
 * @name GET request
 * @function
 * @returns {Array<Object>} All languages in the database.
 */
router.get("/", async (req, res) => {
    try {
        let allLanguages = await connection.findAllLanguages();
        res.send(allLanguages);
    } catch (error) {
        res.status(500).send(error);
    }
});
/**
 * Schema for validating POST requests.
 */
const postSchema = {
    type: "object",
    properties: { language: { type: "string" } },
    required: ["language"],
};
/**
 * Attempts to save a language to the database.
 * Sends back an error if the given language object does not have the right kind of data in the right fields.
 * @author Atte Ala-Lahti
 * @name POST request
 * @function
 * @param {Object} req.body - Language to be saved.
 * @returns {Object} The saved language with id from the database added, or an error.
 */
router.post("/", async (req, res) => {
    const validation = validator.validate(req.body, postSchema);
    if (validation.errors.length > 0) {
        res.status(400).send(validation.errors);
    } else {
        try {
            let id = await connection.saveLanguage(req.body.language);
            res.status(201).send({ ...req.body, id: id });
        } catch (error) {
            res.status(500).send(error);
        }
    }
});
/**
 * Schema for validating PATCH requests.
 */
const patchSchema = {
    type: "object",
    properties: {
        id: { type: "number", min: "0" },
        language: { type: "string" },
    },
    required: ["id", "language"],
};
/**
 * Attempts to update a language in the database.
 * Sends back an error if the given language object does not have the right kind of data in the right fields.
 * @author Atte Ala-Lahti
 * @name PATCH request
 * @function
 * @param {Object} req.body - Language to be updated.
 * @returns {status} 200 if something changed, 204 if nothing changed, or an error.
 */
router.patch("/", async (req, res) => {
    const validation = validator.validate(req.body, patchSchema);
    if (validation.errors.length > 0) {
        res.status(400).send(validation.errors);
    } else {
        try {
            let info = await connection.updateLanguage(req.body);
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
/**
 * Attempts to delete a language with a given id from the database.
 * Sends back a 404 error if nothing was deleted.
 * @author Atte Ala-Lahti
 * @name DELETE request
 * @example DELETE /languages/1
 * @function
 * @param {Number} id - Id of the language to be deleted.
 * @returns {status} 204 status, or an error.
 */
router.delete("/:id([0-9]+)", async (req, res) => {
    try {
        let info = await connection.deleteLanguageById(req.params.id);
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
