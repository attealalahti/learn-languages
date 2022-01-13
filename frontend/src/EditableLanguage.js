import React from "react";
import EditableContent from "./EditableContent";
import axios from "axios";
import getUrl from "./getUrl";

/**
 * Callback called before trying to connect to the database.
 * @callback startConnectCallback
 */

/**
 * Callback called after database connection ends.
 * @callback stopConnectCallback
 */

/**
 * Callback called when a database connection error is caught.
 * @callback errorCallback
 */

/**
 * A component that renders and passes all props to a {@link EditableContent} component and
 * contains the {@link saveChangesCallback} for it to save changes to a language.
 * @property {number} props.id - The id of the language to be patched.
 * @property {startConnectCallback} props.startConnect - Callback called before trying to connect to the database.
 * @property {stopConnectCallback} props.stopConnect - Callback called after database connection ends.
 * @property {errorCallback} props.error - Callback called when a database connection error is caught.
 * @author Atte Ala-Lahti
 * @extends React.Component
 */
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
