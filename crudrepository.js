const mysql = require("mysql");
require("dotenv").config();
const config = {
    host: "mydb.tamk.fi",
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    connectionLimit: 10,
};
const pool = mysql.createPool(config);

module.exports = {
    findAll: () =>
        new Promise((resolve, reject) => {
            pool.query("SELECT * FROM word_pairs", (error, wordPairs) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(wordPairs);
                }
            });
        }),
};