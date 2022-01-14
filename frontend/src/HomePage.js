import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CardGroup from "react-bootstrap/CardGroup";
import { LinkContainer } from "react-router-bootstrap";

/**
 * A component that renders the home page of the application.
 * Contains links to Learn and Teach pages.
 * @author Atte Ala-Lahti
 * @extends React.Component
 */
class HomePage extends React.Component {
    /**
     * Renders the home page of the app with links to /learn and /teach.
     * @returns {React.Component} The home page.
     */
    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>Welcome to Learn Languages!</Card.Title>
                    <CardGroup>
                        <Card>
                            <Card.Body>
                                <Card.Text>
                                    Study words to improve in your chosen languages.
                                </Card.Text>
                                <LinkContainer to="/learn">
                                    <Button size="lg">Learn</Button>
                                </LinkContainer>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <Card.Text>
                                    Add words and languages to the database for others to
                                    study.
                                </Card.Text>
                                <LinkContainer to="/teach">
                                    <Button size="lg">Teach</Button>
                                </LinkContainer>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Card.Body>
            </Card>
        );
    }
}

export default HomePage;
