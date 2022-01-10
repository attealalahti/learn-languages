import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class EditableContent extends React.Component {
    state = { editing: false, word: this.props.word };
    currentInput = this.props.word;
    handleSubmit = async (event) => {
        event.preventDefault();
        await this.props.saveChanges(this.currentInput);
        this.setState({ editing: false, word: this.currentInput });
    };
    handleChange = (event) => {
        this.currentInput = event.target.value;
    };
    componentDidUpdate(previousProps, previousState) {
        if (this.state.editing && !previousState.editing) {
            let input = document.getElementById("WordInput");
            input.focus();
            input.addEventListener("blur", (event) => {
                this.currentInput = this.state.word;
                this.setState({ editing: false });
            });
        }
        if (previousProps.word !== this.props.word) {
            this.currentInput = this.props.word;
            this.setState({ word: this.props.word });
        }
    }
    render() {
        if (this.state.editing) {
            return (
                <Form onSubmit={this.handleSubmit} className="Word">
                    <Form.Control
                        id="WordInput"
                        defaultValue={this.state.word}
                        onChange={this.handleChange}
                    />
                </Form>
            );
        } else {
            return (
                <Button
                    variant="outline-dark"
                    onClick={() => this.setState({ editing: true })}
                    className="Word"
                >
                    {this.state.word}
                </Button>
            );
        }
    }
}

export default EditableContent;
