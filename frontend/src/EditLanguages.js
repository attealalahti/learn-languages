import React from "react";
import axios from "axios";
import getUrl from "./getUrl";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import EditableWord from "./EditableWord";
import Card from "react-bootstrap/Card";

class EditLanguages extends React.Component {
    state = {
        loading: true,
        error: false,
        languages: [],
    };
    async componentDidMount() {
        try {
            let languagesResponse = await axios.get(`${getUrl()}/languages`);
            this.setState({ loading: false, languages: languagesResponse.data });
        } catch (error) {
            this.setState({ loading: false, error: true });
        }
    }
    addLanguage = async () => {
        let newLanguage = { language: "" };
        let newLanguageResponse = await axios.post(`${getUrl()}/languages`, newLanguage);
        let newLanguages = [...this.state.languages, newLanguageResponse.data];
        this.setState({ languages: newLanguages });
    };
    deleteLanguage = async (id) => {
        let newLanguages = this.state.languages.filter((language) => language.id !== id);
        await axios.delete(`${getUrl()}/languages/${id}`);
        this.setState({ languages: newLanguages });
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
                <Card>
                    <Card.Body>
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>Languages</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.languages.map((language, index) => (
                                    <tr key={index}>
                                        <th>
                                            <EditableWord
                                                id={language.id}
                                                word={language.word_in_language1}
                                                wordPair={language}
                                                languageIndex={0}
                                                updateWordPairs={this.updateLanguages}
                                            />
                                        </th>
                                        <td style={{ width: "50px" }}>
                                            <Button
                                                variant="danger"
                                                onClick={() =>
                                                    this.deleteLanguage(language.id)
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
                            onClick={this.addLanguage}
                        >
                            Add language
                        </Button>
                    </Card.Body>
                </Card>
            );
        }
    }
}
export default EditLanguages;
