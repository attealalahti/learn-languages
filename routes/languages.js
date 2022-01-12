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
const postSchema = {
    type: "object",
    properties: { language: { type: "string" } },
    required: ["language"],
};
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
const patchSchema = {
    type: "object",
    properties: {
        id: { type: "number", min: "0" },
        language: { type: "string" },
    },
    required: ["id", "language"],
};
router.patch("/", async (req, res) => {
    const validation = validator.validate(req.body, patchSchema);
    if (validation.errors.length > 0) {
        res.status(400).send(validation.errors);
    } else {
        try {
            let info = await connection.updateLanguage(req.body);
            if (info.changedRows > 0) {
                res.status(201).send(req.body);
            } else {
                res.sendStatus(204);
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }
});
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
