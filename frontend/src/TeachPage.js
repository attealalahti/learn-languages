import React from "react";
import EditWordPairs from "./EditWordPairs";
import TeachOptions from "./TeachOptions";
class TeachPage extends React.Component {
    state = { stage: "options", language1: undefined, language2: undefined };
    moveToEditing = (language1, language2) => {
        this.setState({
            stage: "editing",
            language1: language1,
            language2: language2,
        });
    };
    render() {
        if (this.state.stage === "options") {
            return <TeachOptions continue={this.moveToEditing} />;
        } else if (this.state.stage === "editing") {
            return (
                <EditWordPairs
                    language1={this.state.language1}
                    language2={this.state.language2}
                />
            );
        }
    }
}
export default TeachPage;
