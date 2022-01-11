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

class AnsweringSection extends React.Component {
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
                `${getUrl()}/words?from=${this.props.languageFrom}&to=${
                    this.props.languageTo
                }`
            );
            this.setState({ loading: false, words: wordsResponse.data });
        } catch (error) {
            this.setState({ loading: false, error: true });
        }
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
