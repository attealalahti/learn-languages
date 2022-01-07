import React from "react";
import getUrl from "./getUrl";
import axios from "axios";
import Feedback from "./Feedback";
class LearnPage extends React.Component {
    state = {
        loading: true,
        error: false,
        words: undefined,
        currentWordIndex: 0,
        wordsAnswered: 0,
        correctWords: 0,
        showFeedback: false,
    };
    currentInput = "";
    async componentDidMount() {
        try {
            let wordsResponse = await axios.get(
                `${getUrl()}/words?from=finnish&to=english`
            );
            this.setState({ loading: false, words: wordsResponse.data });
        } catch (error) {
            this.setState({ loading: false, error: true });
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let newCorrectWords = this.state.correctWords;
        // Check if the user inputted word was correct
        if (
            this.currentInput.toLowerCase() ===
            this.state.words[this.state.currentWordIndex].word_in_language2.toLowerCase()
        ) {
            newCorrectWords++;
        }
        // Clear text input
        document.getElementById("LearnPageTextInput").value = "";
        this.currentInput = "";

        // Update values
        let nextIndex = this.state.currentWordIndex + 1;
        if (nextIndex >= this.state.words.length) {
            nextIndex = 0;
        }
        this.setState({
            currentWordIndex: nextIndex,
            wordsAnswered: this.state.wordsAnswered + 1,
            correctWords: newCorrectWords,
            showFeedback: true,
        });
    };
    handleTextInputChange = (event) => {
        this.currentInput = event.target.value;
    };
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
        } else if (this.state.showFeedback) {
            return <Feedback continue={() => this.setState({ showFeedback: false })} />;
        } else if (this.state.wordsAnswered !== this.state.words.length) {
            return (
                <div>
                    <div>
                        {this.state.words[this.state.currentWordIndex].word_in_language1}
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            id="LearnPageTextInput"
                            onChange={this.handleTextInputChange}
                            type="text"
                            placeholder={`Type in ${
                                this.state.words[this.state.currentWordIndex].language2
                            }...`}
                            autoComplete="off"
                        />
                        <input type="submit" value="Submit" />
                    </form>
                    <div>
                        Words answered: {this.state.wordsAnswered}/
                        {this.state.words.length}
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    {this.state.correctWords}/{this.state.words.length} correct!
                </div>
            );
        }
    }
}
export default LearnPage;
