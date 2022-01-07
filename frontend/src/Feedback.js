import React from "react";

class Feedback extends React.Component {
    render() {
        return <button onClick={this.props.nextWord}>Next</button>;
    }
}

export default Feedback;
