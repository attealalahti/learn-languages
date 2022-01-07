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
        answerCorrect: false,
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
        let answerCorrect =
            this.currentInput.toLowerCase() ===
            this.state.words[this.state.currentWordIndex].word_in_language2.toLowerCase();
        if (answerCorrect) {
            newCorrectWords++;
        }
        // Clear text input
        document.getElementById("LearnPageTextInput").value = "";
        this.currentInput = "";

        this.setState({
            wordsAnswered: this.state.wordsAnswered + 1,
            correctWords: newCorrectWords,
            showFeedback: true,
            answerCorrect: answerCorrect,
        });
    };
    handleTextInputChange = (event) => {
        this.currentInput = event.target.value;
    };
    nextWord = () => {
        this.setState({
            showFeedback: false,
            currentWordIndex: this.state.currentWordIndex + 1,
        });
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
            return (
                <div>
                    <Feedback
                        answerCorrect={this.state.answerCorrect}
                        correctWord={this.state.words[this.state.currentWordIndex]}
                    />
                    <button onClick={this.nextWord}>Next</button>
                </div>
            );
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
