import React from "react";
import EditableContent from "./EditableContent";
import axios from "axios";
import getUrl from "./getUrl";

class EditableLanguage extends React.Component {
    saveLanguage = async (currentInput) => {
        let newLanguage = { id: this.props.id, language: currentInput };
        await axios.patch(`${getUrl()}/languages`, newLanguage);
    };
    render() {
        return <EditableContent {...this.props} saveChanges={this.saveLanguage} />;
    }
}

export default EditableLanguage;
