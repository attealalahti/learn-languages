import React from "react";
import EditableContent from "./EditableContent";
import axios from "axios";
import getUrl from "./getUrl";

class EditableWord extends React.Component {
    saveWord = async (currentInput) => {
        let newWordPair;
        if (this.props.languageIndex === 0) {
            newWordPair = {
                ...this.props.wordPair,
                word_in_language1: currentInput,
            };
        } else if (this.props.languageIndex === 1) {
            newWordPair = {
                ...this.props.wordPair,
                word_in_language2: currentInput,
            };
        }
        await axios.patch(`${getUrl()}/words`, newWordPair);
        this.props.updateWordPairs(newWordPair);
    };
    render() {
        return <EditableContent {...this.props} saveChanges={this.saveWord} />;
    }
}

export default EditableWord;
