// Gets localhost url when running a development build and the real url when running the production build.
function getUrl() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        return "http://localhost:8080";
    } else {
        return "https://ala-lahti-learn-languages.herokuapp.com";
    }
}
export default getUrl;
