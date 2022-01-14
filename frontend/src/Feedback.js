import React from "react";
import Card from "react-bootstrap/Card";

/**
 * A component that display feedback based on if an answer was correct or not.
 * @property {boolean} props.answerCorrect - Whether or not the answer was correct.
 * @property {string} props.correctWord - The actual correct word.
 * @author Atte Ala-Lahti
 * @extends React.Component
 */
class Feedback extends React.Component {
    /**
     * Renders a card title that tells the user if they were correct
     * and what the correct word was if they got it wrong.
     * @returns {Card.Title} A message informing the user of the correctness of their answer.
     */
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
