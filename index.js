const express = require("express");
const app = express();
const connection = require("./crudrepository");

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log(`Listening on port ${server.address().port}`);
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    next();
});

app.use(express.static("frontend/build"));

app.use("/data", async (req, res) => {
    let wordPairs = await connection.findAll();
    res.send(wordPairs);
});
