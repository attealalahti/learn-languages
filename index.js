const express = require("express");
const app = express();
const mysql = require("mysql");
require("dotenv").config();

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log(`Listening on port ${server.address().port}`);
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    next();
});

app.use(express.static("frontend/build"));

const config = {
    host: "mydb.tamk.fi",
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    connectionLimit: 10,
};
const pool = mysql.createPool(config);
app.use("/data", (req, res) => {
    pool.query("SELECT * FROM word_pairs", (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.send(results);
        }
    });
});
