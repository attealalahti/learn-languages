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
 * A component that renders a UI to add, edit and delete word pairs from two specified languages.
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
    /**
     * @property {boolean} loading - Whether or not data is being fetched from the database.
     * @property {boolean} error - Whether or not there was an error with communicating with the database.
     * @property {boolean} connecting - Whether or not there is currently an attempt to connect to the database.
     * @property {Array<Object>} wordPairs - Word pairs to display in the table.
     */
    state = {
        loading: true,
        error: false,
        connecting: false,
        wordPairs: [],
    };
    /**
     * When the component first loads, tries to fetch all word pairs from the specified languages from the database.
     * If this fails, sets the error state.
     */
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
    /**
     * Attempts to add a new blank word pair to this component and the database.
     * The languages of the word pair are the same as the languages of all other word pairs
     * currently displayed in the table.
     * If this fails, sets the error state.
     * @function
     * @async
     */
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
    /**
     * Attempts to delete a word pair from this component and the database.
     * If this fails, sets the error state.
     * @function
     * @async
     * @param {number} id - Id of the word pair to be deleted.
     */
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
    /**
     * Attempts to update changed word pair to the database.
     * If this fails, sets the error state.
     * @function
     * @async
     * @param {object} updatedWordPair - New version of the word pair to be updated to the database.
     */
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
    /**
     * Renders a view on the word pair editing page:
     * a loading animation when loading,
     * an error message when an error has occurred
     * or a table of word pairs that can be edited or deleted
     * and a button to add a new word pair.
     * @returns {React.Component} A view on the word pair editing page.
     */
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
