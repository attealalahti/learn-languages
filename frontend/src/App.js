import "./App.css";
import LearnPage from "./LearnPage";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import TeachPage from "./TeachPage";
import "bootstrap/dist/css/bootstrap.min.css";
import TeachWordsPage from "./TeachWordsPage";
import EditLanguages from "./EditLanguages";

function App() {
    return (
        <BrowserRouter>
            <header>
                <span>Learn Languages!</span>
                <Link to="/learn">Learn</Link>
                <Link to="/teach">Teach</Link>
            </header>
            <div className="Content">
                <Routes>
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
