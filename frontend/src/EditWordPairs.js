import React from "react";
import axios from "axios";
import getUrl from "./getUrl";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import EditableWord from "./EditableWord";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import ConnectionSpinner from "./ConnectionSpinner";

/**
 * Callback to move back from editing word pairs to selecting which word pairs to edit.
 * @callback goBackTeachCallBack
 */

/**
 * A component that renders a UI to add, edit and delete word pairs.
 * All changes are updated to the database.
 * Word pairs are displayed in a table.
 * @property {string} props.language1 - The language the first column of words are in.
 * @property {string} props.language2 - The language the second column of words are in.
 * @property {number} props.language1Id - The id of the language the first column of words are in.
 * @property {number} props.language2Id - The id of the language the second column of words are in.
 * @property {goBackTeachCallBack} props.goBack - Callback called when the "Back" button is clicked.
 * @author Atte Ala-Lahti
 * @extends React.Component
 */
class EditWordPairs extends React.Component {
    state = {
        loading: true,
        error: false,
        connecting: false,
        wordPairs: [],
    };
    async componentDidMount() {
        try {
            let wordsResponse = await axios.get(
                `${getUrl()}/words?from=${this.props.language1}&to=${
                    this.props.language2
                }`
            );
            this.setState({ loading: false, wordPairs: wordsResponse.data });
        } catch (error) {
            this.setState({ loading: false, error: true });
        }
    }
    addRow = async () => {
        this.setState({ connecting: true });
        try {
            let newWordPair = {
                language1: this.props.language1,
                language2: this.props.language2,
                language1_id: this.props.language1Id,
                language2_id: this.props.language2Id,
                word_in_language1: "",
                word_in_language2: "",
            };
            let newWordPairResponse = await axios.post(`${getUrl()}/words`, newWordPair);
            let newWordPairs = [...this.state.wordPairs, newWordPairResponse.data];
            this.setState({ wordPairs: newWordPairs, connecting: false });
        } catch (error) {
            this.setState({ error: true, connecting: false });
        }
    };
    deleteRow = async (id) => {
        this.setState({ connecting: true });
        try {
            let newWordPairs = this.state.wordPairs.filter(
                (wordPair) => wordPair.id !== id
            );
            await axios.delete(`${getUrl()}/words/${id}`);
            this.setState({ wordPairs: newWordPairs, connecting: false });
        } catch (error) {
            this.setState({ error: true, connecting: false });
        }
    };
    updateWordPairs = async (updatedWordPair) => {
        this.setState({ connecting: true });
        try {
            await axios.patch(`${getUrl()}/words`, updatedWordPair);
            let index = this.state.wordPairs.findIndex(
                (wordPair) => wordPair.id === updatedWordPair.id
            );
            let newWordPairs = Array.from(this.state.wordPairs);
            newWordPairs.splice(index, 1, updatedWordPair);
            this.setState({ wordPairs: newWordPairs, connecting: false });
        } catch (error) {
            this.setState({ error: true, connecting: false });
        }
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
                <Alert variant="danger">
                    Error
                    <br />
                    Database connection failed
                </Alert>
            );
        } else {
            return (
                <Card>
                    <Card.Body>
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>{this.props.language1}</th>
                                    <th>{this.props.language2}</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.wordPairs.map((wordPair, index) => (
                                    <tr key={index}>
                                        <th>
                                            <EditableWord
                                                content={wordPair.word_in_language1}
                                                wordPair={wordPair}
                                                languageIndex={0}
                                                updateWordPairs={this.updateWordPairs}
                                            />
                                        </th>
                                        <th>
                                            <EditableWord
                                                content={wordPair.word_in_language2}
                                                wordPair={wordPair}
                                                languageIndex={1}
                                                updateWordPairs={this.updateWordPairs}
                                            />
                                        </th>
                                        <td style={{ width: "50px" }}>
                                            <Button
                                                variant="danger"
                                                onClick={() =>
                                                    this.deleteRow(wordPair.id)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Button style={{ float: "left" }} onClick={this.addRow}>
                            Add row
                        </Button>
                        <Button style={{ float: "right" }} onClick={this.props.goBack}>
                            Back
                        </Button>
                        <ConnectionSpinner connecting={this.state.connecting} />
                    </Card.Body>
                </Card>
            );
        }
    }
}
export default EditWordPairs;
