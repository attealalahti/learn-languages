import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

class TeachPage extends React.Component {
    render() {
        return (
            <Card>
                <Card.Body>
                    <Link to="/teach/languages">
                        <Button className="LinkButton" size="lg">
                            Edit languages
                        </Button>
                    </Link>
                    <Link to="/teach/words">
                        <Button className="LinkButton" size="lg">
                            Edit words
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    }
}

export default TeachPage;
