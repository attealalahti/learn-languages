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

/**
 * A component that renders a UI to add, edit and delete languages.
 * All changes are updated to the database.
 * Languages are displayed in a table.
 * @author Atte Ala-Lahti
 * @extends React.Component
 */
class EditLanguages extends React.Component {
    /**
     * @property {boolean} loading - Whether or not data is being fetched from the database.
     * @property {boolean} error - Whether or not there was an error with communicating with the database.
     * @property {boolean} connecting - Whether or not there is currently an attempt to connect to the database.
     * @property {Array<Object>} languages - Languages to display in the table.
     */
    state = {
        loading: true,
        error: false,
        connecting: false,
        languages: [],
    };
    /**
     * When the component first loads, tries to fetch all languages from the database.
     * If this fails, sets the error state.
     */
    async componentDidMount() {
        try {
            let languagesResponse = await axios.get(`${getUrl()}/languages`);
            this.setState({ loading: false, languages: languagesResponse.data });
        } catch (error) {
            this.setState({ loading: false, error: true });
        }
    }
    /**
     * Attempts to add a new blank language to this component and the database.
     * @function
     * @async
     */
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
                                                startConnect={() =>
                                                    this.setState({ connecting: true })
                                                }
                                                stopConnect={() => {
                                                    this.setState({ connecting: false });
                                                }}
                                                error={() =>
                                                    this.setState({ error: true })
                                                }
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
