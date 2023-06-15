import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {LoginPage} from "./pages/login";

function App() {
    return (
        <BrowserRouter>
            <div className={'app-container'}>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
