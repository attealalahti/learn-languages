const express = require("express");
/**
 * Serves [/words]{@link module:routes/words}, [/languages]{@link module:routes/languages} and the frontend.
 * @author Atte Ala-Lahti
 */
const app = express();
const cors = require("cors");
const words = require("./routes/words.js");
const languages = require("./routes/languages.js");

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log(`Listening on port ${server.address().port}`);
});

app.use(cors());
app.use(express.json());
app.use("/words", words);
app.use("/languages", languages);
app.use(express.static("frontend/build"));
// Route all other urls also to the frontend
app.use("*", express.static("frontend/build"));
