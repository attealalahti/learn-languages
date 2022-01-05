import React from "react";
import getUrl from "./getUrl";
class LearnPage extends React.Component {
    state = { loading: true, data: undefined, currentWordIndex: 0 };
    async componentDidMount() {
        let data = await fetch(`${getUrl()}/data`);
        let obj = await data.json();
        this.setState({ loading: false, data: obj });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let nextIndex = this.state.currentWordIndex + 1;
        if (nextIndex >= this.state.data.length) {
            nextIndex = 0;
        }
        this.setState({ currentWordIndex: nextIndex });
    };
    render() {
        if (this.state.loading) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <div>
                        {this.state.data[this.state.currentWordIndex].word_in_language1}
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            placeholder={`Type in ${
                                this.state.data[this.state.currentWordIndex].language2
                            }...`}
                        />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            );
        }
    }
}
export default LearnPage;
