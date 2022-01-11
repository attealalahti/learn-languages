import "./App.css";
import LearnPage from "./LearnPage";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import TeachPage from "./TeachPage";
import "bootstrap/dist/css/bootstrap.min.css";
import TeachWordsPage from "./TeachWordsPage";
import EditLanguages from "./EditLanguages";
import HomePage from "./HomePage";
import NavBar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";

function App() {
    return (
        <BrowserRouter>
            <NavBar bg="primary" variant="dark">
                <Link to="/">
                    <NavBar.Brand> Learn Languages!</NavBar.Brand>
                </Link>
                <Nav>
                    <Link to="/learn">
                        <Nav.Link href="/learn">Learn</Nav.Link>
                    </Link>
                    <Link to="/teach">
                        <Nav.Link href="/teach">Teach</Nav.Link>
                    </Link>
                </Nav>
            </NavBar>
            <div className="Content">
                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/learn" element={<LearnPage />}></Route>
                    <Route path="/teach" element={<TeachPage />}></Route>
                    <Route path="/teach/words" element={<TeachWordsPage />}></Route>
                    <Route path="/teach/languages" element={<EditLanguages />}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
