import React from "react";
import Overlay from "react-bootstrap/esm/Overlay";
import Tooltip from "react-bootstrap/esm/Tooltip";

class LanguageSelectTooltip extends React.Component {
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
