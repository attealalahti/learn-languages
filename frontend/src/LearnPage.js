import React from "react";
import AnsweringSection from "./AnsweringSection";
import LearnOptions from "./LearnOptions";

/**
 * A component that renders the Learn page of the app.
 * First prompts the user to select languages to study,
 * then quizzes them on words in those languages.
 * @author Atte Ala-Lahti
 * @extends React.Component
 */
class LearnPage extends React.Component {
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
                    goBack={() => this.setState({ stage: "options" })}
                />
            );
        }
    }
}
export default LearnPage;
