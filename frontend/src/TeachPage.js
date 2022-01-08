import React from "react";
import AnsweringSection from "./AnsweringSection";
import LearnOptions from "./LearnOptions";
class TeachPage extends React.Component {
    state = { stage: "options", languageFrom: undefined, languageTo: undefined };
    moveToAnsweringSection = (languageFrom, languageTo) => {
        this.setState({
            stage: "answering",
            languageFrom: languageFrom,
            languageTo: languageTo,
        });
    };
    render() {
        if (this.state.stage === "options") {
            return <LearnOptions continue={this.moveToAnsweringSection} />;
        } else if (this.state.stage === "answering") {
            return (
                <AnsweringSection
                    languageFrom={this.state.languageFrom}
                    languageTo={this.state.languageTo}
                />
            );
        }
    }
}
export default TeachPage;
