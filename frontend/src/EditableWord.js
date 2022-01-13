import React from "react";
import EditableContent from "./EditableContent";

class EditableWord extends React.Component {
    saveWord = async (newContent) => {
        let newWordPair;
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
    render() {
        return <EditableContent {...this.props} saveChanges={this.saveWord} />;
    }
}

export default EditableWord;
