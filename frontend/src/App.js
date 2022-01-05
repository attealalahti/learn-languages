import "./App.css";
import TestComponent from "./TestComponent";
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
                    <Route path="/" element={<TestComponent />}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
