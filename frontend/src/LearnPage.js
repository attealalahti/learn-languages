import React from "react";
import getUrl from "./getUrl";
class LearnPage extends React.Component {
    state = { loading: true, data: undefined };
    async componentDidMount() {
        let data = await fetch(`${getUrl()}/data`);
        console.log(data);
        let obj = await data.json();
        this.setState({ loading: false, data: obj });
        console.log(obj);
    }
    render() {
        if (this.state.loading) {
            return <div>Loading...</div>;
        } else {
            return <div>{this.state.data[0].word_in_language1}</div>;
        }
    }
}
export default LearnPage;
