import React from "react";
import getUrl from "./getUrl";
class LearnPage extends React.Component {
    state = { loading: true, data: undefined };
    async componentDidMount() {
        let data = await fetch(`${getUrl()}/data`);
        let obj = await data.json();
        this.setState({ loading: false, data: obj });
    }
    render() {
        if (this.state.loading) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    {this.state.data[0].word_in_language1}
                    <form>
                        <input
                            type="text"
                            placeholder={`Type in ${this.state.data[0].language2}...`}
                        />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            );
        }
    }
}
export default LearnPage;
