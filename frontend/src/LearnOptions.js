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

class LearnOptions extends React.Component {
    state = { loading: true, error: false, languages: undefined, showTooltip: false };
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
                    Failed to load page content
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
