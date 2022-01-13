import React from "react";
import EditableContent from "./EditableContent";
import axios from "axios";
import getUrl from "./getUrl";

class EditableLanguage extends React.Component {
    saveLanguage = async (newContent) => {
        this.props.startConnect();
        try {
            let newLanguage = { id: this.props.id, language: newContent };
            await axios.patch(`${getUrl()}/languages`, newLanguage);
            this.props.stopConnect();
        } catch (error) {
            this.props.stopConnect();
            this.props.error();
        }
    };
    render() {
        return <EditableContent {...this.props} saveChanges={this.saveLanguage} />;
    }
}

export default EditableLanguage;
