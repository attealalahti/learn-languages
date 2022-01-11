import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

class TeachPage extends React.Component {
    render() {
        return (
            <Card>
                <Card.Body>
                    <LinkContainer to="/teach/languages">
                        <Button className="LinkButton" size="lg">
                            Edit languages
                        </Button>
                    </LinkContainer>
                    <LinkContainer to="/teach/words">
                        <Button className="LinkButton" size="lg">
                            Edit words
                        </Button>
                    </LinkContainer>
                </Card.Body>
            </Card>
        );
    }
}

export default TeachPage;
