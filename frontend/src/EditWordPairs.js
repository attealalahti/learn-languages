import React from "react";
import axios from "axios";
import getUrl from "./getUrl";

class EditWordPairs extends React.Component {
    state = { loading: true, error: false, words: undefined };
    async componentDidMount() {
        try {
            let wordsResponse = await axios.get(
                `${getUrl()}/words?from=${this.props.language1}&to=${
                    this.props.language2
                }`
            );
            this.setState({ loading: false, words: wordsResponse.data });
        } catch (error) {
            this.setState({ loading: false, error: true });
        }
    }
    render() {
        if (this.state.loading) {
            return <div>Loading...</div>;
        } else if (this.state.error) {
            return (
                <div>
                    Error
                    <br />
                    Failed to load page content
                </div>
            );
        } else {
            return (
                <div className="GridContainer">
                    <div>
                        <div>{this.state.words[0].language1}</div>
                        {this.state.words.map((wordPair) => {
                            return (
                                <div key={wordPair.id}>{wordPair.word_in_language1}</div>
                            );
                        })}
                    </div>
                    <div>
                        <div>{this.state.words[0].language2}</div>
                        {this.state.words.map((wordPair) => {
                            return (
                                <div key={wordPair.id}>{wordPair.word_in_language2}</div>
                            );
                        })}
                    </div>
                </div>
            );
        }
    }
}
export default EditWordPairs;
