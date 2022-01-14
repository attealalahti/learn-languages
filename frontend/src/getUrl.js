// Gets localhost url when running a development build and the real url when running the production build.

/**
 * A function for choosing the correct RESTful api url.
 * @module
 * @author Atte Ala-Lahti
 */

/**
 * Returns the url for RESTful api.
 * Return a localhost url for testing when running a development build.
 * Returns the real Heroku url when running the production build.
 * @returns {string} A localhost url or the Heroku url.
 */
function getUrl() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        return "http://localhost:8080";
    } else {
        return "https://ala-lahti-learn-languages.herokuapp.com";
    }
}
export default getUrl;
