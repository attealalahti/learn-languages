const express = require("express");
const connection = require("../crudrepository.js");
const router = express.Router();

router.get("/", async (req, res) => {
    let wordPairs = await connection.findAll();
    res.send(wordPairs);
});

module.exports = router;
