import React from "react";
import EditWordPairs from "./EditWordPairs";
import TeachWordsOptions from "./TeachWordsOptions";

/**
 * A component that renders the word editing page of the app.
 * First prompts the user to select languages to edit words from,
 * then lets them edit those word pairs.
 * @author Atte Ala-Lahti
 * @extends React.Component
 */
class TeachWordsPage extends React.Component {
    /**
     * @property {boolean} showOptions - Whether to render the options or the word pair editing section.
     * @property {number} language1Id - The id of the language of the first editing column words.
     * @property {number} language2Id - The id of the language of the second editing column words.
     * @property {string} language1 - The language of the first editing column words.
     * @property {string} language2 - The language of the second editing column words.
     */
    state = {
        showOptions: true,
        language1Id: NaN,
        language2Id: NaN,
        language1: undefined,
        language2: undefined,
    };
    /**
     * Move from the language select to the word pair editing section.
     * Set the languages to edit words from.
     * @function
     * @param {number} language1Id - The id of the language of the first editing column words.
     * @param {number} language2Id - The id of the language of the second editing column words.
     * @param {string} language1 - The language of the first editing column words.
     * @param {string} language2 - The language of the second editing column words.
     */
    moveToEditing = (language1Id, language2Id, language1, language2) => {
        this.setState({
            showOptions: false,
            language1Id: language1Id,
            language2Id: language2Id,
            language1: language1,
            language2: language2,
        });
    };
    /**
     * Renders the word pair editing page:
     * First prompts the user to select languages to edit words from,
     * then lets them edit those word pairs.
     * @returns {React.Component} A view in the word editing page.
     */
    render() {
        if (this.state.showOptions) {
            return <TeachWordsOptions continue={this.moveToEditing} />;
        } else {
            return (
                <EditWordPairs
                    language1Id={this.state.language1Id}
                    language2Id={this.state.language2Id}
                    language1={this.state.language1}
                    language2={this.state.language2}
                    goBack={() => {
                        this.setState({ showOptions: true });
                    }}
                />
            );
        }
    }
}
export default TeachWordsPage;
