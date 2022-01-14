import React from "react";
import Overlay from "react-bootstrap/esm/Overlay";
import Tooltip from "react-bootstrap/esm/Tooltip";

/**
 * A component that renders a tooltip on a specified element
 * to prompt the user to select two different languages.
 * @property {string} props.targetId - Id of the element this tooltip is supposed to be on.
 * @property {boolean} props.show - Whether or not to show the tooltip.
 * @author Atte Ala-Lahti
 * @extends React.Component
 */
class LanguageSelectTooltip extends React.Component {
    /**
     * Renders a tooltip on a specified element.
     * The tooltip prompts the user to select two different languages.
     * @returns {Overlay} An overlay with a tooltip component.
     */
    render() {
        return (
            <Overlay
                target={document.getElementById(this.props.targetId)}
                show={this.props.show}
                placement="bottom"
            >
                {(props) => <Tooltip {...props}>Select two different languages!</Tooltip>}
            </Overlay>
        );
    }
}

export default LanguageSelectTooltip;
