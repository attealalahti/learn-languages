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
    findAllWordPairs: () =>
        new Promise((resolve, reject) => {
            pool.query(
                "SELECT w.id, l1.language AS language1, l2.language AS language2, w.word_in_language1, w.word_in_language2 FROM ((word_pairs AS w INNER JOIN languages AS l1 ON w.language1_id = l1.id) INNER JOIN languages AS l2 ON w.language2_id = l2.id)",
                (error, wordPairs) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(wordPairs);
                    }
                }
            );
        }),
    findWordPairsByLanguages: (language1, language2) =>
        new Promise((resolve, reject) => {
            pool.query(
                "SELECT w.id, l1.language AS language1, l2.language AS language2, w.word_in_language1, w.word_in_language2 FROM ((word_pairs AS w INNER JOIN languages AS l1 ON w.language1_id = l1.id) INNER JOIN languages AS l2 ON w.language2_id = l2.id) WHERE (l1.language = ? AND l2.language = ?) OR (l1.language = ? AND l2.language = ?)",
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
    save: (wordPair) =>
        new Promise((resolve, reject) => {
            pool.query(
                "INSERT INTO word_pairs (language1, language2, word_in_language1, word_in_language2) VALUES (?, ?, ?, ?)",
                [
                    wordPair.language1,
                    wordPair.language2,
                    wordPair.word_in_language1,
                    wordPair.word_in_language2,
                ],
                (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve("Word pair saved.");
                    }
                }
            );
        }),
    deleteById: (id) =>
        new Promise((resolve, reject) => {
            pool.query("DELETE FROM word_pairs WHERE id = ?", [id], (error, info) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(info);
                }
            });
        }),
};
