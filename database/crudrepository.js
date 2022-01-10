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
                "SELECT w.id, l1.language AS language1, l2.language AS language2, w.word_in_language1, w.word_in_language2 FROM ((word_pairs AS w INNER JOIN languages AS l1 ON w.language1_id = l1.id) INNER JOIN languages AS l2 ON w.language2_id = l2.id) ORDER BY w.id",
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
                "SELECT w.id, l1.language AS language1, l1.id AS language1_id, l2.language AS language2, l2.id AS language2_id, w.word_in_language1, w.word_in_language2 FROM ((word_pairs AS w INNER JOIN languages AS l1 ON w.language1_id = l1.id) INNER JOIN languages AS l2 ON w.language2_id = l2.id) WHERE (l1.language = ? AND l2.language = ?) OR (l1.language = ? AND l2.language = ?) ORDER BY w.id",
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
    findWordPairById: (id) =>
        new Promise((resolve, reject) => {
            pool.query(
                "SELECT * FROM word_pairs WHERE id = ?",
                [id],
                (error, wordPair) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(wordPair);
                    }
                }
            );
        }),
    saveWordPair: (wordPair) =>
        new Promise((resolve, reject) => {
            pool.query(
                "CALL AddWordPair(?, ?, ?, ?)",
                [
                    wordPair.language1_id,
                    wordPair.language2_id,
                    wordPair.word_in_language1,
                    wordPair.word_in_language2,
                ],
                (error, out) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(out[0][0]["LAST_INSERT_ID()"]);
                    }
                }
            );
        }),
    deleteWordPairById: (id) =>
        new Promise((resolve, reject) => {
            pool.query("DELETE FROM word_pairs WHERE id = ?", [id], (error, info) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(info);
                }
            });
        }),
    updateWordPair: (wordPair) =>
        new Promise((resolve, reject) => {
            pool.query(
                "UPDATE word_pairs SET word_in_language1 = ?, word_in_language2 = ? WHERE id = ?",
                [wordPair.word_in_language1, wordPair.word_in_language2, wordPair.id],
                (error, info) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(info);
                    }
                }
            );
        }),
    findAllLanguages: () =>
        new Promise((resolve, reject) => {
            pool.query("SELECT * FROM languages", (error, languages) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(languages);
                }
            });
        }),
    saveLanguage: (language) =>
        new Promise((resolve, reject) => {
            pool.query("CALL AddLanguage(?)", [language], (error, out) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(out[0][0]["LAST_INSERT_ID()"]);
                }
            });
        }),
    updateLanguage: (language) =>
        new Promise((resolve, reject) => {
            pool.query(
                "UPDATE languages SET language = ? WHERE id = ?",
                [language.language, language.id],
                (error, info) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(info);
                    }
                }
            );
        }),
};
