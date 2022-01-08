import React from "react";

class WordPair extends React.Component {
    render() {
        return (
            <div className="WordPair">
                <button>Edit</button>
                <div className="WordContainer">
                    <span className="WordInLanguage1">
                        {this.props.wordPair.word_in_language1}
                    </span>
                    <span className="WordInLanguage2">
                        {this.props.wordPair.word_in_language2}
                    </span>
                </div>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        );
    }
}

export default WordPair;
