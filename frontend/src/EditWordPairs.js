import React from "react";
import axios from "axios";
import getUrl from "./getUrl";
import WordPair from "./WordPair";

class EditWordPairs extends React.Component {
    state = { loading: true, error: false, words: undefined };
    async componentDidMount() {
        try {
            let wordsResponse = await axios.get(
                `${getUrl()}/words?from=${this.props.language1}&to=${
                    this.props.language2
                }`
            );
            this.setState({ loading: false, words: wordsResponse.data });
        } catch (error) {
            this.setState({ loading: false, error: true });
        }
    }
    render() {
        if (this.state.loading) {
            return <div>Loading...</div>;
        } else if (this.state.error) {
            return (
                <div>
                    Error
                    <br />
                    Failed to load page content
                </div>
            );
        } else {
            return (
                <div>
                    <div>
                        {this.props.language1} {this.props.language2}
                    </div>
                    {this.state.words.map((wordPair) => (
                        <WordPair key={wordPair.id} wordPair={wordPair} />
                    ))}
                </div>
            );
        }
    }
}
export default EditWordPairs;
