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
    findByLanguages: (language1, language2) =>
        new Promise((resolve, reject) => {
            pool.query(
                "SELECT * FROM word_pairs WHERE (language1 = ? AND language2 = ?) OR (language1 = ? AND language2 = ?)",
                [language1, language2, language2, language1],
                (error, wordPairs) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(wordPairs);
                    }
                }
            );
        }),
    save: (language1, language2, wordInLanguage1, wordInLanguage2) =>
        new Promise((resolve, reject) => {
            pool.query(
                "INSERT INTO word_pairs (language1, language2, word_in_language1, word_in_language2) VALUES ?, ?, ?, ?",
                [language1, language2, wordInLanguage1, wordInLanguage2],
                (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve("Word pair saved.");
                    }
                }
            );
        }),
};
