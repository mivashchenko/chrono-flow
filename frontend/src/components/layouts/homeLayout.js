import React from 'react';
import {useAuth} from "../../authProvider";
import {Link, Navigate, Outlet} from "react-router-dom";
export const HomeLayout = () => {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/dashboard/profile" />;
    }

    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
            </nav>
            <Outlet />
        </div>
    )
};