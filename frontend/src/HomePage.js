import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CardGroup from "react-bootstrap/CardGroup";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
    render() {
        return (
            <Card className="HomePage">
                <Card.Body>
                    <Card.Title>Welcome to Learn Languages!</Card.Title>
                    <CardGroup>
                        <Card>
                            <Card.Body>
                                <Card.Text>
                                    Study words to improve in your chosen languages.
                                </Card.Text>
                                <Link to="/learn">
                                    <Button size="lg">Learn</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <Card.Text>
                                    Add words to the database for others to study.
                                </Card.Text>
                                <Link to="/teach">
                                    <Button size="lg">Teach</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Card.Body>
            </Card>
        );
    }
}

export default HomePage;
