import React from "react";
import axios from "axios";
import getUrl from "./getUrl";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import EditableLanguage from "./EditableLanguage";
import { LinkContainer } from "react-router-bootstrap";
import Alert from "react-bootstrap/Alert";
import ConnectionSpinner from "./ConnectionSpinner";

class EditLanguages extends React.Component {
    state = {
        loading: true,
        error: false,
        connecting: false,
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
        this.setState({ connecting: true });
        try {
            let newLanguage = { language: "" };
            let newLanguageResponse = await axios.post(
                `${getUrl()}/languages`,
                newLanguage
            );
            let newLanguages = [...this.state.languages, newLanguageResponse.data];
            this.setState({ languages: newLanguages, connecting: false });
        } catch (error) {
            this.setState({ error: true, connecting: false });
        }
    };
    deleteLanguage = async (id) => {
        this.setState({ connecting: true });
        try {
            let newLanguages = this.state.languages.filter(
                (language) => language.id !== id
            );
            await axios.delete(`${getUrl()}/languages/${id}`);
            this.setState({ languages: newLanguages, connecting: false });
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
                                    <th>Languages</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.languages.map((language, index) => (
                                    <tr key={index}>
                                        <th>
                                            <EditableLanguage
                                                id={language.id}
                                                content={language.language}
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
                        <Button style={{ float: "left" }} onClick={this.addLanguage}>
                            Add language
                        </Button>
                        <LinkContainer to="/teach" style={{ float: "right" }}>
                            <Button>Back</Button>
                        </LinkContainer>
                        <ConnectionSpinner connecting={this.state.connecting} />
                    </Card.Body>
                </Card>
            );
        }
    }
}
export default EditLanguages;
