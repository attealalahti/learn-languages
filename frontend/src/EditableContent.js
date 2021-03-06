import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

/**
 * Callback for saving changes of the content of the component to the database.
 * @callback saveChangesCallback
 * @async
 * @param {string} newContent - New version of the content.
 */

/**
 * A component that renders a button that when clicked becomes a text input.
 * The text on the button changes to what is typed into the input.
 * @property {string} props.content - Button text and input default value.
 * @property {saveChangesCallback} props.saveChanges - Callback for saving changes of the content to the database.
 * @author Atte Ala-Lahti
 * @extends React.Component
 */
class EditableContent extends React.Component {
    /**
     * @property {boolean} editing - Whether or not component is in editing mode to render text input.
     * @property {string} content - Current button text and input default value.
     */
    state = { editing: false, content: this.props.content };
    /**
     * Current text in the input element.
     * @type {string}
     */
    currentInput = this.props.content;
    /**
     * When an edit to the content is submitted, the new version is saved to the database and editing mode is exited.
     * @function
     * @param {object} event - The form submit event.
     */
    handleSubmit = async (event) => {
        event.preventDefault();
        await this.props.saveChanges(this.currentInput);
        this.setState({ editing: false, content: this.currentInput });
    };
    /**
     * When the value in the text input element changes, the [currentInput]{@link EditableContent#currentInput} variable is updated.
     * @function
     * @param {object} event - The text input change event.
     */
    handleChange = (event) => {
        this.currentInput = event.target.value;
    };
    /**
     * When the component updates and the content prop changes, update state about it.
     * After coming into editing mode, focus on the input element.
     * When its focus is lost, exit editing mode.
     * @param {object} previousProps - Props from the previous state.
     * @param {object} previousState - Previous state.
     */
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
    /**
     * When editing, renders a text input.
     * When not editing, renders a button.
     * @returns {React.Component} A button or a text input.
     */
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
