import React from "react";
import getUrl from "./getUrl";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import LanguageSelectTooltip from "./LanguageSelectTooltip";

/**
 * Callback to start editing word pairs and send language information to {@link EditWordPairs} component.
 * @callback continueTeachCallback
 * @param {number} language1Id - The id of the language of the first column words.
 * @param {number} language2Id - The id of the language of the second column words.
 * @param {string} language1 - The language of the first column words.
 * @param {string} language2 - The language of the second column words.
 */

/**
 * A component that prompts the user to select two languages to edit words from.
 * @property {continueTeachCallback} props.continue - Callback called with the selected languages and their ids.
 * @author Atte Ala-Lahti
 * @extends React.Component
 */
class TeachWordsOptions extends React.Component {
    /**
     * @property {boolean} loading - Whether or not data is being fetched from the database.
     * @property {boolean} error - Whether or not there was an error with communicating with the database.
     * @property {Array<Object>} languages - Languages to select from.
     * @property {boolean} showTooltip - Whether or not to show a tooltip about selecting different languages.
     */
    state = { loading: true, error: false, languages: [], showTooltip: false };
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
     * When the languages are selected and they are different from each other,
     * Move on to editing the words of those languages by passing the language information on.
     * If the selected languages are the same, show a tooltip to prompt the user to select different languages.
     * @function
     * @param {object} event - The form submit event.
     */
    handleSubmit = (event) => {
        event.preventDefault();
        // Get the ids of the selected languages
        let language1Id = Number(document.getElementById("lang1").value);
        let language2Id = Number(document.getElementById("lang2").value);
        if (language1Id !== language2Id) {
            // Get the actual language strings based on the ids.
            let language1 = this.state.languages.find(
                (lang) => lang.id === language1Id
            ).language;
            let language2 = this.state.languages.find(
                (lang) => lang.id === language2Id
            ).language;
            this.props.continue(language1Id, language2Id, language1, language2);
        } else {
            this.setState({ showTooltip: true });
        }
    };
    /**
     * Renders a view in the language selection section:
     * a loading animation when loading,
     * an error message when an error has occurred
     * or options to select two languages to edit words from.
     * @returns {React.Component} A view in the language selection section.
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
                        <Card.Text>Which words do you want to edit?</Card.Text>
                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col>
                                    <FloatingLabel label="From">
                                        <Form.Select id="lang1">
                                            {this.state.languages.map((lang) => {
                                                return (
                                                    <option key={lang.id} value={lang.id}>
                                                        {lang.language}
                                                    </option>
                                                );
                                            })}
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    <Form.Group id="lang2Group">
                                        <FloatingLabel label="To">
                                            <Form.Select id="lang2">
                                                {this.state.languages.map((lang) => {
                                                    return (
                                                        <option
                                                            key={lang.id}
                                                            value={lang.id}
                                                        >
                                                            {lang.language}
                                                        </option>
                                                    );
                                                })}
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button
                                        type="submit"
                                        style={{ float: "left" }}
                                        id="EditWordsButton"
                                    >
                                        Edit words
                                    </Button>
                                    <LanguageSelectTooltip
                                        show={this.state.showTooltip}
                                        targetId="EditWordsButton"
                                    />
                                    <LinkContainer to="/teach" style={{ float: "right" }}>
                                        <Button as="button">Back</Button>
                                    </LinkContainer>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            );
        }
    }
}

export default TeachWordsOptions;
