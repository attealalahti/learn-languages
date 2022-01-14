import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

/**
 * A component that renders the main Teach page.
 * Contains links to editing languages and editing words.
 */
class TeachPage extends React.Component {
    /**
     * Renders the Teach page containing two buttons that link to
     * /teach/languages and /teach/words.
     * @returns {React.Component} The Teach page.
     */
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
