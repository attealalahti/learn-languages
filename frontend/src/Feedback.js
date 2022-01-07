import React from "react";

class Feedback extends React.Component {
    render() {
        if (this.props.answerCorrect) {
            return <div>Correct!</div>;
        } else {
            return (
                <div>
                    Incorrect. The correct answer was <b>{this.props.correctWord}</b>.
                </div>
            );
        }
    }
}

export default Feedback;
