import React from "react";
import axios from "axios";
import getUrl from "./getUrl";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

class EditWordPairs extends React.Component {
    state = { loading: true, error: false, words: [] };
    index = 0;
    async componentDidMount() {
        try {
            let wordsResponse = await axios.get(
                `${getUrl()}/words?from=${this.props.language1}&to=${
                    this.props.language2
                }`
            );
            this.setState({ loading: false, words: wordsResponse.data });
        } catch (error) {
            this.setState({ loading: false, error: true });
        }
    }
    addRow = () => {
        let newWords = [
            ...this.state.words,
            {
                id: "new" + this.index++,
                language1: this.props.language1,
                language2: this.props.language2,
                word_in_language1: "",
                word_in_language2: "",
            },
        ];
        this.setState({ words: newWords });
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
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>{this.props.language1}</th>
                                <th>{this.props.language2}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.words.map((wordPair) => (
                                <tr key={wordPair.id}>
                                    <td contentEditable="true">
                                        {wordPair.word_in_language1}
                                    </td>
                                    <td contentEditable="true">
                                        {wordPair.word_in_language2}
                                    </td>
                                    <td style={{ width: "50px" }}>
                                        <Button variant="danger">Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Button className="AddRowButton" onClick={this.addRow}>
                        Add row
                    </Button>{" "}
                    <Button className="SaveChangesButton" variant="success">
                        Save changes
                    </Button>
                </div>
            );
        }
    }
}
export default EditWordPairs;
