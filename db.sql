CREATE TABLE languages (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    language VARCHAR(100) NOT NULL
);

CREATE TABLE word_pairs (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    language1_id INT UNSIGNED NOT NULL,
    language2_id INT UNSIGNED NOT NULL,
    word_in_language1 VARCHAR(1000) NOT NULL,
    word_in_language2 VARCHAR(1000) NOT NULL,
    CONSTRAINT fk_language1_id FOREIGN KEY(language1_id) REFERENCES languages(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_language2_id FOREIGN KEY(language2_id) REFERENCES languages(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

INSERT INTO languages (language) VALUES ("Finnish");
INSERT INTO languages (language) VALUES ("English");
INSERT INTO languages (language) VALUES ("Swedish");

INSERT INTO word_pairs (language1_id, language2_id, word_in_language1, word_in_language2) VALUES (6, 5, "bra", "good");

SELECT w.id, l1.language AS language1, l2.language AS language2, w.word_in_language1, w.word_in_language2
FROM ((word_pairs AS w
INNER JOIN languages AS l1 ON w.language1_id = l1.id)
INNER JOIN languages AS l2 ON w.language2_id = l2.id)
WHERE (l1.language = "Finnish" AND l2.language = "English")
OR
(l1.language = "English" AND l2.language = "Finnish");

SELECT * FROM languages;

DROP PROCEDURE IF EXISTS AddWordPair;
DELIMITER //
CREATE PROCEDURE AddWordPair(
    IN language1_id INT,
    IN language2_id INT,
    IN word_in_language1 VARCHAR(1000),
    IN word_in_language2 VARCHAR(1000)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;
        START TRANSACTION;
        INSERT INTO word_pairs (language1_id, language2_id, word_in_language1, word_in_language2)
        VALUES (language1_id, language2_id, word_in_language1, word_in_language2);
        SELECT LAST_INSERT_ID();
        COMMIT;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS AddLanguage;
DELIMITER //
CREATE PROCEDURE AddLanguage(
    IN language VARCHAR(100)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;
        START TRANSACTION;
        INSERT INTO languages (language)
        VALUES (language);
        SELECT LAST_INSERT_ID();
        COMMIT;
END //
DELIMITER ;