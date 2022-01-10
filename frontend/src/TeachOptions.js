import React from "react";
import getUrl from "./getUrl";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class TeachOptions extends React.Component {
    state = { loading: true, error: false, languages: undefined };
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
        let language1Id = Number(document.getElementById("lang1").value);
        let language2Id = Number(document.getElementById("lang2").value);
        if (language1Id !== language2Id) {
            let language1 = this.state.languages.find(
                (lang) => lang.id === language1Id
            ).language;
            let language2 = this.state.languages.find(
                (lang) => lang.id === language2Id
            ).language;
            this.props.continue(language1Id, language2Id, language1, language2);
        }
    };
    render() {
        if (this.state.loading) {
            return <div>Loading...</div>;
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
                <div className="Container">
                    <div>Which words do you want to edit?</div>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group id="lang1Group">
                                    <FloatingLabel label="Language 1">
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
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group id="lang2Group">
                                    <FloatingLabel label="Language 2">
                                        <Form.Select id="lang2">
                                            {this.state.languages.map((lang) => {
                                                return (
                                                    <option key={lang.id} value={lang.id}>
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
                                <Button type="submit">Edit words</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            );
        }
    }
}

export default TeachOptions;
