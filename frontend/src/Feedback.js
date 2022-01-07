import React from "react";

class Feedback extends React.Component {
    render() {
        return <button onClick={this.props.continue}>Next</button>;
    }
}

export default Feedback;
