import React from "react";
import getUrl from "./getUrl";
import axios from "axios";

class TeachOptions extends React.Component {
    state = { loading: true, error: false, languages: undefined };
    componentDidMount = async () => {
        try {
            let languagesResponse = await axios.get(`${getUrl()}/languages`);
            this.setState({ loading: false, languages: languagesResponse.data });
        } catch (error) {
            this.setState({ loading: false, error: true });
        }
    };
    handleSubmit = (event) => {
        event.preventDefault();
        let language1Id = Number(document.getElementById("lang1").value);
        let language2Id = Number(document.getElementById("lang2").value);
        if (language1Id !== language2Id) {
            let language1 = this.state.languages.find(
                (lang) => lang.id === language1Id
            ).language;
            let language2 = this.state.languages.find(
                (lang) => lang.id === language2Id
            ).language;
            this.props.continue(language1Id, language2Id, language1, language2);
        }
    };
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
                    <div>Choose languages to add words to.</div>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="lang1">Language 1:</label>
                        <select id="lang1">
                            {this.state.languages.map((lang) => {
                                return (
                                    <option key={lang.id} value={lang.id}>
                                        {lang.language}
                                    </option>
                                );
                            })}
                        </select>
                        <label htmlFor="lang2">Language 2:</label>
                        <select id="lang2">
                            {this.state.languages.map((lang) => {
                                return (
                                    <option key={lang.id} value={lang.id}>
                                        {lang.language}
                                    </option>
                                );
                            })}
                        </select>
                        <br />
                        <input type="submit" value="Confirm" />
                    </form>
                </div>
            );
        }
    }
}

export default TeachOptions;
