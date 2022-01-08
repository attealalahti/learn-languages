import React from "react";
import getUrl from "./getUrl";
import axios from "axios";

class LearnOptions extends React.Component {
    state = { loading: true, error: false, languages: undefined };
    componentDidMount = async () => {
        try {
            let languagesResponse = await axios.get(`${getUrl()}/languages`);
            this.setState({ loading: false, languages: languagesResponse.data });
        } catch (error) {
            this.setState({ loading: false, error: true });
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
                    {this.state.languages.map((lang) => {
                        return <div>{lang.language}</div>;
                    })}
                </div>
            );
        }
    }
}

export default LearnOptions;
