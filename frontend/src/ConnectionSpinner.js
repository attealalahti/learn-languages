import React from "react";
import Spinner from "react-bootstrap/Spinner";

/**
 * A component that renders a spinning loading icon when attempting to connect to the database.
 * @property {boolean} props.connecting - Whether or not the icon should be visible.
 * @author Atte Ala-Lahti
 * @extends React.Component
 */
class ConnectionSpinner extends React.Component {
    /**
     * Returns a style to hide the component if it is not supposed to be active.
     * @function
     * @returns {string} Undefined when active, "none" when not active.
     */
    getActive = () => {
        if (!this.props.connecting) {
            return "none";
        }
    };
    /**
     * Renders a spinning loading icon when attempting to connect to the database.
     * @returns {React.Component} A loading icon styled to float to the right when attempting to connect to the database.
     */
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
