import React from "react";
import Spinner from "react-bootstrap/Spinner";
import PropTypes from "prop-types";

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
ConnectionSpinner.propTypes = {
    connecting: PropTypes.string.isRequired,
};

export default ConnectionSpinner;
