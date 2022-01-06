import React from "react";
import getUrl from "./getUrl";
class LearnPage extends React.Component {
    state = { loading: true, words: undefined, currentWordIndex: 0, wordsAnswered: 0 };
    async componentDidMount() {
        let data = await fetch(`${getUrl()}/words?from=finnish&to=english`);
        let obj = await data.json();
        this.setState({ loading: false, words: obj });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let nextIndex = this.state.currentWordIndex + 1;
        if (nextIndex >= this.state.words.length) {
            nextIndex = 0;
        }
        this.setState({
            currentWordIndex: nextIndex,
            wordsAnswered: this.state.wordsAnswered + 1,
        });
    };
    render() {
        if (this.state.loading) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <div>
                        {this.state.words[this.state.currentWordIndex].word_in_language1}
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            placeholder={`Type in ${
                                this.state.words[this.state.currentWordIndex].language2
                            }...`}
                        />
                        <input type="submit" value="Submit" />
                    </form>
                    <div>
                        Words answered: {this.state.wordsAnswered}/
                        {this.state.words.length}
                    </div>
                </div>
            );
        }
    }
}
export default LearnPage;
