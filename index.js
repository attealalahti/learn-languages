const express = require("express");
const app = express();

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log(`Listening on port ${server.address().port}`);
});

app.get("/", (req, res) => {
    res.send("test");
});
