import React, {useEffect} from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    useNavigate, createBrowserRouter, createRoutesFromElements,
    defer,
} from "react-router-dom";
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {SignUpPage} from "./pages/sign_up";
import {HomePage} from "./pages/home";
import {LoginPage} from "./pages/login";
import {ProtectedRoute} from "./components/router/protectedRoute";
import {HomeLayout} from "./components/layouts/homeLayout";
import {ProtectedLayout} from "./components/layouts/protectedLayout";
import {AuthLayout} from "./components/layouts/authLayout";

const getUserData = () => {
    const token = localStorage.getItem('token');
    return fetch('http://localhost:5555/auth/user',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.json())
};

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthLayout/>} loader={() => defer({userPromise: getUserData()})}>
            <Route element={<HomeLayout/>}>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignUpPage/>}/>
            </Route>

            <Route path="/dashboard" element={<ProtectedLayout/>}>
                <Route path="profile" element={<div>Profile</div>}/>
                <Route path="settings" element={<div>Settings</div>}/>
            </Route>
        </Route>
    )
)
