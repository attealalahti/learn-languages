import "./App.css";
import React from "react";
import LearnPage from "./LearnPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TeachPage from "./TeachPage";
import "bootstrap/dist/css/bootstrap.min.css";
import TeachWordsPage from "./TeachWordsPage";
import EditLanguages from "./EditLanguages";
import HomePage from "./HomePage";
import NavBar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

/**
 * The main component that renders the whole single page application.
 * @author Atte Ala-Lahti
 * @extends React.Component
 */
class App extends React.Component {
    /**
     * Renders pages of the app depending on the url.
     * /: Home page with links to Learn and Teach pages.
     * /learn: Page for studying languages.
     * /teach: Page for editing the language and word database.
     * /teach/words: Edit words in the database.
     * /teach/languages: Edit languages in the database.
     * @returns A page of the application.
     */
    render() {
        return (
            <BrowserRouter>
                <NavBar bg="primary" variant="dark">
                    <LinkContainer to="/">
                        <NavBar.Brand> Learn Languages!</NavBar.Brand>
                    </LinkContainer>
                    <Nav>
                        <LinkContainer to="/learn">
                            <Nav.Link>Learn</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/teach">
                            <Nav.Link>Teach</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </NavBar>
                <div className="Content">
                    <Routes>
                        <Route path="/" element={<HomePage />}></Route>
                        <Route path="/learn" element={<LearnPage />}></Route>
                        <Route path="/teach" element={<TeachPage />}></Route>
                        <Route path="/teach/words" element={<TeachWordsPage />}></Route>
                        <Route
                            path="/teach/languages"
                            element={<EditLanguages />}
                        ></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
