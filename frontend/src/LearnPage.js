import React from "react";
import AnsweringSection from "./AnsweringSection";
import LearnOptions from "./LearnOptions";
class LearnPage extends React.Component {
    state = { stage: "options" };
    render() {
        if (this.state.stage === "options") {
            return <LearnOptions />;
        } else if (this.state.stage === "answering") {
            return <AnsweringSection />;
        }
    }
}
export default LearnPage;
