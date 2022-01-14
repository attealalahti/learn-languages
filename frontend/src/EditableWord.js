import React from "react";
import EditableContent from "./EditableContent";

/**
 * Callback to update the word pair to the database.
 * @callback updateWordPairsCallback
 * @async
 * @param {object} updatedWordPair - New version of the word pair to be updated to the database.
 */

/**
 * A component that renders and passes all props to an {@link EditableContent} component and
 * contains the {@link saveChangesCallback} for it to save changes to a word pair.
 * @property {number} props.languageIndex - Whether this EditableWord represents the first or the second word in the word pair.
 * @property {object} props.wordPair - Original word pair this word belongs to.
 * @property {updateWordPairsCallback} props.updateWordPairs - Callback to update the word pair to the database.
 * @author Atte Ala-Lahti
 * @extends React.Component
 */
class EditableWord extends React.Component {
    /**
     * Attempts to update a word pair in the database with a new version of a word.
     * @function
     * @async
     * @param {string} newContent - New version of the word.
     */
    saveWord = async (newContent) => {
        let newWordPair;
        // Check languageIndex to know if this is the first or second word in the pair.
        if (this.props.languageIndex === 0) {
            newWordPair = {
                ...this.props.wordPair,
                word_in_language1: newContent,
            };
        } else if (this.props.languageIndex === 1) {
            newWordPair = {
                ...this.props.wordPair,
                word_in_language2: newContent,
            };
        }
        await this.props.updateWordPairs(newWordPair);
    };
    /**
     * Renders an {@link EditableContent} component and passes all props to it.
     * @returns {EditableContent} An EditableContent component.
     */
    render() {
        return <EditableContent {...this.props} saveChanges={this.saveWord} />;
    }
}

export default EditableWord;
