import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Block from "./components/Block";

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/codeblock/:id' element={<Block />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
