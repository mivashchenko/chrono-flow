import {Link, Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../../authProvider";
import {useSelector} from "react-redux";

export const ProtectedLayout = () => {
    const { user } = useAuth();

    const data = useSelector((state) => state.user.data);

    if (!user) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <nav>
                <Link to="/dashboard/settings">Settings</Link>
                <Link to="/dashboard/profile">Profile</Link>
                <Link to="/dashboard/calendar">Calendar</Link>
            </nav>
            <Outlet />
        </div>
    )
};