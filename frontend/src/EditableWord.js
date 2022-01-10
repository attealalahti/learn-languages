import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import getUrl from "./getUrl";

class EditableWord extends React.Component {
    state = { editing: false, word: this.props.word };
    currentInput = this.props.word;
    handleSubmit = async (event) => {
        event.preventDefault();
        let newWordPair;
        if (this.props.languageIndex === 0) {
            newWordPair = {
                ...this.props.wordPair,
                word_in_language1: this.currentInput,
            };
        } else if (this.props.languageIndex === 1) {
            newWordPair = {
                ...this.props.wordPair,
                word_in_language2: this.currentInput,
            };
        }
        await axios.patch(`${getUrl()}/words`, newWordPair);
        this.props.updateWordPairs(newWordPair);
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
                <Button onClick={() => this.setState({ editing: true })} className="Word">
                    {this.state.word}
                </Button>
            );
        }
    }
}

export default EditableWord;
