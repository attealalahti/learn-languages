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
 * A component that prompts the user to translate words and checks if they got them correct.
 * @property {string} props.languageFrom - Language to translate from.
 * @property {string} props.languageTo - Language to translate into.
 * @property {function} props.goBack - Function that sets the state of the app to go back to the language selection stage.
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
     * @author Atte Ala-Lahti
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
     * Current text in the input field.
     * @type {string}
     * @author Atte Ala-Lahti
     */
    currentInput = "";
    /**
     * When the component first loads, it tries to fetch all words from the languages
     * translations are supposed to be made from and to, from the database.
     * If this fails, sets the error state.
     * @author Atte Ala-Lahti
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
    getProgressBar = () => {
        return (
            <ProgressBar
                now={(this.state.wordsAnswered / this.state.words.length) * 100}
                animated
            />
        );
    };
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
