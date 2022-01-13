import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
/**
 * Callback for saving changes of the content of the component to the database.
 * @callback saveChangesCallback
 * @param {string} newContent - New version of the content.
 */

/**
 * A component that renders a button that when clicked becomes a text input.
 * The text on the button changes to what is typed into the input.
 * @property {string} props.content - Button text and input default value.
 * @property {saveChangesCallback} props.saveChanges - Callback for saving changes of the content to the database.
 */
class EditableContent extends React.Component {
    state = { editing: false, content: this.props.content };
    currentInput = this.props.content;
    handleSubmit = async (event) => {
        event.preventDefault();
        await this.props.saveChanges(this.currentInput);
        this.setState({ editing: false, content: this.currentInput });
    };
    handleChange = (event) => {
        this.currentInput = event.target.value;
    };
    componentDidUpdate(previousProps, previousState) {
        if (this.state.editing && !previousState.editing) {
            let input = document.getElementById("ContentInput");
            input.focus();
            input.addEventListener("blur", (event) => {
                this.currentInput = this.state.content;
                this.setState({ editing: false });
            });
        }
        if (previousProps.content !== this.props.content) {
            this.currentInput = this.props.content;
            this.setState({ content: this.props.content });
        }
    }
    render() {
        if (this.state.editing) {
            return (
                <Form onSubmit={this.handleSubmit} className="EditableContent">
                    <Form.Control
                        id="ContentInput"
                        defaultValue={this.state.content}
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                </Form>
            );
        } else {
            return (
                <Button
                    variant="outline-dark"
                    onClick={() => this.setState({ editing: true })}
                    className="EditableContent"
                >
                    {this.state.content}
                </Button>
            );
        }
    }
}

export default EditableContent;
