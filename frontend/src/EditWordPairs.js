import React from "react";
import axios from "axios";
import getUrl from "./getUrl";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";

class EditWordPairs extends React.Component {
    state = { loading: true, error: false, wordPairs: [] };
    wordPairsInDatabase;
    async componentDidMount() {
        try {
            let wordsResponse = await axios.get(
                `${getUrl()}/words?from=${this.props.language1}&to=${
                    this.props.language2
                }`
            );
            this.wordPairsInDatabase = wordsResponse.data;
            this.setState({ loading: false, wordPairs: wordsResponse.data });
        } catch (error) {
            this.setState({ loading: false, error: true });
        }
    }
    addRow = () => {
        let newWordPairs = [
            ...this.state.wordPairs,
            {
                id: "new",
                language1: this.props.language1,
                language2: this.props.language2,
                word_in_language1: "",
                word_in_language2: "",
            },
        ];
        this.setState({ wordPairs: newWordPairs });
    };
    saveChanges = async (event) => {
        event.preventDefault();
        let allInputs = Array.from(event.target);
        let allWords = allInputs.filter((input) => input.type === "text");
        let wordPairPatches = [];
        // Go through all words and add all word pairs that don't match their database versions to array
        for (let i = 0; i < this.wordPairsInDatabase.length; i++) {
            if (
                allWords[i * 2].value !== this.wordPairsInDatabase[i].word_in_language1 ||
                allWords[i * 2 + 1].value !==
                    this.wordPairsInDatabase[i].word_in_language2
            ) {
                wordPairPatches.push(
                    axios.patch(`${getUrl()}/words`, {
                        id: this.wordPairsInDatabase[i].id,
                        language1_id: this.props.language1Id,
                        language2_id: this.props.language2Id,
                        word_in_language1: allWords[i * 2].value,
                        word_in_language2: allWords[i * 2 + 1].value,
                    })
                );
            }
        }
        await Promise.all(wordPairPatches);
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
                <div>
                    Error
                    <br />
                    Failed to load page content
                </div>
            );
        } else {
            return (
                <div className="TableContainer">
                    <Form onSubmit={this.saveChanges}>
                        <Table striped bordered onChange={this.handleChange}>
                            <thead>
                                <tr>
                                    <th>{this.props.language1}</th>
                                    <th>{this.props.language2}</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="table">
                                {this.state.wordPairs.map((wordPair, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Form.Control
                                                defaultValue={wordPair.word_in_language1}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                defaultValue={wordPair.word_in_language2}
                                            />
                                        </td>
                                        <td style={{ width: "50px" }}>
                                            <Button as="button" variant="danger">
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Button
                            as="button"
                            className="AddRowButton"
                            onClick={this.addRow}
                        >
                            Add row
                        </Button>
                        <Button
                            type="submit"
                            className="SaveChangesButton"
                            variant="success"
                        >
                            Save changes
                        </Button>
                    </Form>
                </div>
            );
        }
    }
}
export default EditWordPairs;
