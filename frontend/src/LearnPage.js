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
    /**
     * @property {boolean} props.showOptions - Whether to render the options or the answering section.
     * @property {string} props.languageFrom - Language to translate words from.
     * @property {string} props.languageTo - Language to translate words into.
     */
    state = { showOptions: true, languageFrom: undefined, languageTo: undefined };
    /**
     * Move from the language select to the answering section.
     * Set the languages to study.
     * @function
     * @param {string} languageFrom - Language to translate words from.
     * @param {string} languageTo - Language to translate words into.
     */
    moveToAnsweringSection = (languageFrom, languageTo) => {
        this.setState({
            showOptions: false,
            languageFrom: languageFrom,
            languageTo: languageTo,
        });
    };
    /**
     * Renders the Learn page:
     * First prompts the user to select languages to study,
     * then quizzes them on words in those languages.
     * @returns {React.Component} A view in the Learn page.
     */
    render() {
        if (this.state.showOptions) {
            return <LearnOptions continue={this.moveToAnsweringSection} />;
        } else {
            return (
                <AnsweringSection
                    languageFrom={this.state.languageFrom}
                    languageTo={this.state.languageTo}
                    goBack={() => this.setState({ showOptions: true })}
                />
            );
        }
    }
}
export default LearnPage;
