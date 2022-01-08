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
        if (
            document.getElementById("from").value !== document.getElementById("to").value
        ) {
            this.props.continue(
                document.getElementById("from").value,
                document.getElementById("to").value
            );
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
                    <div>Choose languages to study.</div>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="from">From:</label>
                        <select id="from">
                            {this.state.languages.map((lang) => {
                                return <option key={lang.id}>{lang.language}</option>;
                            })}
                        </select>
                        <label htmlFor="to">To:</label>
                        <select id="to">
                            {this.state.languages.map((lang) => {
                                return <option key={lang.id}>{lang.language}</option>;
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
