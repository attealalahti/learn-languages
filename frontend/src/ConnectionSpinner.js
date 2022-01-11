import React from "react";
import Spinner from "react-bootstrap/Spinner";

class ConnectionSpinner extends React.Component {
    getActive = () => {
        if (!this.props.connecting) {
            return "none";
        }
    };
    render() {
        return (
            <Spinner
                animation="border"
                role="status"
                style={{ float: "right", display: this.getActive() }}
            >
                <div className="visually-hidden">Connecting...</div>
            </Spinner>
        );
    }
}

export default ConnectionSpinner;
