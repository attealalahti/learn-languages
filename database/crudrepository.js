const mysql = require("mysql");
require("dotenv").config();
/**
 * Contains all functions to access and modify the database.
 * @author Atte Ala-Lahti
 * @module
 */
/**
 * Configuration for connecting to the mysql database.
 */
const config = {
    host: "mydb.tamk.fi",
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    connectionLimit: 10,
};
const pool = mysql.createPool(config);

/**
 * Attempts to get all word pairs and the names of their languages from the database.
 * @async
 * @returns {Promise<Array>} All word pairs with names of the languages, or an error from the database.
 */
module.exports.findAllWordPairs = () =>
    new Promise((resolve, reject) => {
        pool.query(
            "SELECT w.id, l1.language AS language1, l1.id AS language1_id, l2.language AS language2, l2.id AS language2_id, w.word_in_language1, w.word_in_language2 FROM ((word_pairs AS w INNER JOIN languages AS l1 ON w.language1_id = l1.id) INNER JOIN languages AS l2 ON w.language2_id = l2.id) ORDER BY w.id",
            (error, wordPairs) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(wordPairs);
                }
            }
        );
    });
/**
 * Attempts to get all word pairs of two specified languages and the names of the languages from the database.
 * @async
 * @param {string} language1 - Language one of the words has to be in.
 * @param {string} language2 - Language the other one of the words has to be in.
 * @returns {Promise<Array>} All word pairs of the specified languages with names of the languages, or an error from the database.
 */
module.exports.findWordPairsByLanguages = (language1, language2) =>
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
    });
/**
 * Attempts to get a word pair with a specified id from the database.
 * @async
 * @param {number} id - Id of the word pair to get.
 * @returns {Promise<Object>} Word pair with the specified id, or an error from the database.
 */
module.exports.findWordPairById = (id) =>
    new Promise((resolve, reject) => {
        pool.query("SELECT * FROM word_pairs WHERE id = ?", [id], (error, wordPairs) => {
            if (error) {
                reject(error);
            } else {
                resolve(wordPairs[0]);
            }
        });
    });
/**
 * Attempts to save a word pair to the database.
 * @async
 * @param {object} wordPair - Word pair to save.
 * @returns {Promise<number>} The id of the saved word pair, or an error from the database.
 */
module.exports.saveWordPair = (wordPair) =>
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
    });
/**
 * Attempts to delete a word pair with a specified id from the database.
 * @async
 * @param {number} id - Id of the word pair to delete.
 * @returns {Promise<Object>} Info about what changed in the database, or an error from the database.
 */
module.exports.deleteWordPairById = (id) =>
    new Promise((resolve, reject) => {
        pool.query("DELETE FROM word_pairs WHERE id = ?", [id], (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
/**
 * Attempts to update a word pair's translations in the database.
 * @async
 * @param {object} wordPair - Word pair to with new values to update to the database.
 * @returns {Promise<Object>} Info about what changed in the database, or an error from the database.
 */
module.exports.updateWordPair = (wordPair) =>
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
    });
/**
 * Attempts to get all languages from the database.
 * @async
 * @returns {Promise<Array>} All languages in the database, or an error from the database.
 */
module.exports.findAllLanguages = () =>
    new Promise((resolve, reject) => {
        pool.query("SELECT * FROM languages", (error, languages) => {
            if (error) {
                reject(error);
            } else {
                resolve(languages);
            }
        });
    });
/**
 * Attempts to save a language to the database.
 * @async
 * @param {string} language - Language to save.
 * @returns {Promise<Number>} The id of the saved language, or an error from the database.
 */
module.exports.saveLanguage = (language) =>
    new Promise((resolve, reject) => {
        pool.query("CALL AddLanguage(?)", [language], (error, out) => {
            if (error) {
                reject(error);
            } else {
                resolve(out[0][0]["LAST_INSERT_ID()"]);
            }
        });
    });
/**
 * Attempts to update the name of a language in the database.
 * @async
 * @param {object} language - Language with new a new name to update to the database.
 * @returns {Promise<Object>} Info about what changed in the database, or an error from the database.
 */
module.exports.updateLanguage = (language) =>
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
    });
/**
 * Attempts to delete a language with a specified id from the database.
 * @async
 * @param {number} id - Id of language to delete.
 * @returns {Promise<Object>} Info about what changed in the database, or an error from the database.
 */
module.exports.deleteLanguageById = (id) =>
    new Promise((resolve, reject) => {
        pool.query("DELETE FROM languages WHERE id = ?", [id], (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
