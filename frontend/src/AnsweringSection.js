import React from "react";
import getUrl from "./getUrl";
import axios from "axios";
import Feedback from "./Feedback";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

/**
 * Callback to set the state of {@link LearnPage} back to the language selection stage.
 * @callback goBackLearnCallBack
 */

/**
 * A component that prompts the user to translate words and checks if they got them correct.
 * @property {string} props.languageFrom - Language to translate from.
 * @property {string} props.languageTo - Language to translate into.
 * @property {goBackLearnCallBack} props.goBack - Callback to set the state of {@link LearnPage} back to the language selection stage.
 * @author Atte Ala-Lahti
 * @extends React.Component
 */
class AnsweringSection extends React.Component {
    /**
     * @property {boolean} loading - Whether or not data is being fetched from the database.
     * @property {boolean} error - Whether or not there was an error with communicating with the database.
     * @property {Array<Object>} words - Word pairs to translate.
     * @property {number} currentWordIndex - Index of the current word pair in the words array.
     * @property {number} wordsAnswered - Amount of translation answers given.
     * @property {number} correctWords - Amount of correct translations given.
     * @property {boolean} showFeedback - Whether or not to show a view that tells how well the last word was translated.
     * @property {boolean} answerCorrect - Whether or not the last translation was correct.
     */
    state = {
        loading: true,
        error: false,
        words: [],
        currentWordIndex: 0,
        wordsAnswered: 0,
        correctWords: 0,
        showFeedback: false,
        answerCorrect: false,
    };
    /**
     * Current text in the input element.
     * @type {string}
     */
    currentInput = "";
    /**
     * When the component first loads, it tries to fetch from the database
     * all words from the languages translations are supposed to be made from and to.
     * Word pairs are then shuffled.
     * If this fails, sets the error state.
     */
    async componentDidMount() {
        try {
            let wordsResponse = await axios.get(
                `${getUrl()}/words?from=${this.props.languageFrom}&to=${
                    this.props.languageTo
                }`
            );
            this.setState({ loading: false, words: this.shuffle(wordsResponse.data) });
        } catch (error) {
            this.setState({ loading: false, error: true });
        }
    }
    /**
     * Randomizes the order of the items in an array.
     * @param {Array<any>} array - Array to shuffle.
     * @returns {Array<any>} The shuffled array.
     */
    shuffle(array) {
        let newArray = Array.from(array);
        for (let i = newArray.length; i > 0; i--) {
            let r = Math.floor(Math.random() * i);
            let chosenWord = newArray[r];
            newArray[r] = newArray[i - 1];
            newArray[i - 1] = chosenWord;
        }
        return newArray;
    }
    /**
     * When the component updates, focus on a particular element.
     * When coming to the answering stage, focus on the input element.
     * When coming to the feedback stage, focus on the "Next" button.
     * @param {object} previousProps - Props from the previous state.
     * @param {object} previousState - Previous state.
     */
    componentDidUpdate(previousProps, previousState) {
        // When coming from the feedback stage, focus text input
        if (previousState.showFeedback && !this.state.showFeedback) {
            let textInput = document.getElementById("LearnPageTextInput");
            if (textInput) {
                textInput.focus();
            }
        }
        // When coming to the feedback stage, focus next word button
        else if (!previousState.showFeedback && this.state.showFeedback) {
            let nextWordButton = document.getElementById("NextWordButton");
            if (nextWordButton) {
                nextWordButton.focus();
            }
        }
    }
    /**
     * When a translation to a word is submitted, it is checked if it is correct and state is updated accordingly.
     * Then moves on to the feedback stage.
     * @function
     * @param {object} event - The form submit event.
     */
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
    /**
     * When the value in the text input element changes, the [currentInput]{@link AnsweringSection#currentInput} variable is updated.
     * @function
     * @param {object} event - The text input change event.
     */
    handleTextInputChange = (event) => {
        this.currentInput = event.target.value;
    };
    /**
     * Moves from the feedback stage to answering the next word's translation when the "Next" button is clicked.
     * @function
     */
    nextWord = () => {
        this.setState({
            showFeedback: false,
            currentWordIndex: this.state.currentWordIndex + 1,
        });
    };
    /**
     * Returns a progress bar component that displays how many words have been answered.
     * @function
     * @returns {React.Component} Animated progress bar.
     */
    getProgressBar = () => {
        return (
            <ProgressBar
                now={(this.state.wordsAnswered / this.state.words.length) * 100}
                animated
            />
        );
    };
    /**
     * Renders a view in the answering section:
     * a loading animation when loading,
     * an error message when an error has occurred,
     * input for entering a translation to a word,
     * feedback of the translation
     * or the final results of all answers.
     * @returns {React.Component} A view in the answering section.
     */
    render() {
        if (this.state.loading) {
            return (
                <Spinner animation="border" role="status">
                    <div className="visually-hidden">Loading...</div>
                </Spinner>
            );
        } else if (this.state.error) {
            return (
                <Alert variant="danger">
                    Error
                    <br />
                    Database connection failed
                </Alert>
            );
        } else if (this.state.showFeedback) {
            return (
                <Card>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Feedback
                                    answerCorrect={this.state.answerCorrect}
                                    correctWord={
                                        this.state.words[this.state.currentWordIndex]
                                            .word_in_language2
                                    }
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button id="NextWordButton" onClick={this.nextWord}>
                                    Next
                                </Button>
                            </Col>
                        </Row>
                        {this.getProgressBar()}
                    </Card.Body>
                </Card>
            );
        } else if (this.state.wordsAnswered !== this.state.words.length) {
            return (
                <Card>
                    <Card.Body>
                        <Card.Title>
                            {
                                this.state.words[this.state.currentWordIndex]
                                    .word_in_language1
                            }
                        </Card.Title>
                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col>
                                    <Form.Control
                                        id="LearnPageTextInput"
                                        onChange={this.handleTextInputChange}
                                        type="text"
                                        placeholder={`Type in ${
                                            this.state.words[this.state.currentWordIndex]
                                                .language2
                                        }...`}
                                        autoComplete="off"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button type="submit" style={{ float: "left" }}>
                                        Submit
                                    </Button>
                                    <Button
                                        onClick={this.props.goBack}
                                        style={{ float: "right" }}
                                    >
                                        Select languages
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                        {this.getProgressBar()}
                    </Card.Body>
                </Card>
            );
        } else {
            return (
                <Card>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Card.Title>
                                    You got {this.state.correctWords}/
                                    {this.state.words.length} correct!
                                </Card.Title>
                            </Col>
                        </Row>
                        <Row>
                            <Col>{this.getProgressBar()}</Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button
                                    onClick={() =>
                                        this.setState({
                                            currentWordIndex: 0,
                                            wordsAnswered: 0,
                                            correctWords: 0,
                                            words: this.shuffle(this.state.words),
                                        })
                                    }
                                >
                                    Try again
                                </Button>
                            </Col>
                            <Col>
                                <Button onClick={this.props.goBack}>
                                    Select languages
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            );
        }
    }
}
export default AnsweringSection;
