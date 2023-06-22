import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {useLocalStorage} from "./hooks/useLocalStorage";
import {setUser} from "./store/reducers/userReducer";
import {useDispatch} from "react-redux";
const AuthContext = createContext({});

export const AuthProvider = ({ children, userData }) => {
    console.log(userData)
    const [user, setLocalStorageUser] = useLocalStorage("user", userData);
    const dispatch = useDispatch();
    dispatch(setUser(user))

    const navigate = useNavigate();



    const login = async (data) => {
        setLocalStorageUser(data);
        dispatch(setUser(user))
        navigate("/dashboard/profile", { replace: true });
    };

    const logout = () => {
        setLocalStorageUser(null);
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        navigate("/", { replace: true });
    };

    const parseJwt = (token) => {
        if(!token) {
            return;
        }
        const decode = JSON.parse(atob(token.split('.')[1]));
        console.log(decode);
        if (decode.exp * 1000 < new Date().getTime()) {
            logout();
            console.log('Time Expired');
        }
    };

    parseJwt(window.localStorage.getItem('token'));

    const value = useMemo(
        () => ({
            user,
            login,
            logout
        }),
        [user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};