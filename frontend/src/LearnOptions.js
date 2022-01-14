import React from "react";
import getUrl from "./getUrl";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import LanguageSelectTooltip from "./LanguageSelectTooltip";

/**
 * Callback to start translating words and send language information to {@link AnsweringSection} component.
 * @callback continueLearnCallback
 * @param {string} languageFrom - Language to translate words from.
 * @param {string} languageTo - Language to translate words into.
 */

/**
 * A component that prompts the user to select two languages to study words from.
 * @property {continueLearnCallback} props.continue - Callback called with the selected languages.
 * @author Atte Ala-Lahti
 * @extends React.Component
 */
class LearnOptions extends React.Component {
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
    componentDidMount = async () => {
        try {
            let languagesResponse = await axios.get(`${getUrl()}/languages`);
            this.setState({ loading: false, languages: languagesResponse.data });
        } catch (error) {
            this.setState({ loading: false, error: true });
        }
    };
    handleSubmit = (event) => {
        event.preventDefault();
        if (
            document.getElementById("from").value !== document.getElementById("to").value
        ) {
            this.props.continue(
                document.getElementById("from").value,
                document.getElementById("to").value
            );
        } else {
            this.setState({ showTooltip: true });
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
                        <Row>
                            <Col>
                                <Card.Title>Choose languages to study.</Card.Title>
                            </Col>
                        </Row>
                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col>
                                    <FloatingLabel label="From">
                                        <Form.Select id="from">
                                            {this.state.languages.map((lang) => {
                                                return (
                                                    <option key={lang.id}>
                                                        {lang.language}
                                                    </option>
                                                );
                                            })}
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    <FloatingLabel label="To">
                                        <Form.Select id="to">
                                            {this.state.languages.map((lang) => {
                                                return (
                                                    <option key={lang.id}>
                                                        {lang.language}
                                                    </option>
                                                );
                                            })}
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button type="submit" id="ConfirmButton">
                                        Confirm
                                    </Button>
                                    <LanguageSelectTooltip
                                        show={this.state.showTooltip}
                                        targetId="ConfirmButton"
                                    />
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            );
        }
    }
}

export default LearnOptions;
