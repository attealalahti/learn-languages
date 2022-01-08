const express = require("express");
const connection = require("../database/crudrepository.js");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let allLanguages = await connection.findAllLanguages();
        res.send(allLanguages);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
