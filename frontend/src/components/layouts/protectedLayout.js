import {Link, Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../../authProvider";

export const ProtectedLayout = () => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <nav>
                <Link to="/settings">Settings</Link>
                <Link to="/profile">Profile</Link>
            </nav>
            <Outlet />
        </div>
    )
};