import React from "react";
import axios from "axios";
import getUrl from "./getUrl";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import EditableWord from "./EditableWord";
import Card from "react-bootstrap/Card";

class EditWordPairs extends React.Component {
    state = {
        loading: true,
        error: false,
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
        this.setState({ wordPairs: newWordPairs });
    };
    deleteRow = async (id) => {
        let newWordPairs = this.state.wordPairs.filter((wordPair) => wordPair.id !== id);
        await axios.delete(`${getUrl()}/words/${id}`);
        this.setState({ wordPairs: newWordPairs });
    };
    updateWordPairs = (updatedWordPair) => {
        let index = this.state.wordPairs.findIndex(
            (wordPair) => wordPair.id === updatedWordPair.id
        );
        let newWordPairs = Array.from(this.state.wordPairs);
        newWordPairs.splice(index, 1, updatedWordPair);
        this.setState({ wordPairs: newWordPairs });
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
                <Card className="Container">
                    <Card.Body>
                        <Table striped bordered onChange={this.handleChange}>
                            <thead>
                                <tr>
                                    <th className="WordColumn">{this.props.language1}</th>
                                    <th className="WordColumn">{this.props.language2}</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="table">
                                {this.state.wordPairs.map((wordPair, index) => (
                                    <tr key={index}>
                                        <th className="WordColumn">
                                            <EditableWord
                                                id={wordPair.id}
                                                word={wordPair.word_in_language1}
                                                wordPair={wordPair}
                                                languageIndex={0}
                                                updateWordPairs={this.updateWordPairs}
                                            />
                                        </th>
                                        <th className="WordColumn">
                                            <EditableWord
                                                id={wordPair.id}
                                                word={wordPair.word_in_language2}
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
                        <Button
                            as="button"
                            style={{ float: "left" }}
                            onClick={this.addRow}
                        >
                            Add row
                        </Button>
                    </Card.Body>
                </Card>
            );
        }
    }
}
export default EditWordPairs;
