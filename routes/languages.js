const express = require("express");
const connection = require("../database/crudrepository.js");
const router = express.Router();
const Validator = require("jsonschema").Validator;
const validator = new Validator();
const schema = {
    type: "object",
    properties: { language: { type: "string" } },
    required: ["language"],
};

router.get("/", async (req, res) => {
    try {
        let allLanguages = await connection.findAllLanguages();
        res.send(allLanguages);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.post("/", async (req, res) => {
    const validation = validator.validate(req.body, schema);
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

module.exports = router;
