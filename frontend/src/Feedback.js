import React from "react";
import Card from "react-bootstrap/Card";

class Feedback extends React.Component {
    render() {
        if (this.props.answerCorrect) {
            return <Card.Title>Correct!</Card.Title>;
        } else {
            return (
                <Card.Title>
                    Incorrect. The correct answer was <b>{this.props.correctWord}</b>.
                </Card.Title>
            );
        }
    }
}

export default Feedback;
