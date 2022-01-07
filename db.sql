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

INSERT INTO word_pairs (language1_id, language2_id, word_in_language1, word_in_language2) VALUES (3, 5, "sana", "word");