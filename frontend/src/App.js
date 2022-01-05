import "./App.css";
import LearnPage from "./LearnPage";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

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
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
