import { useContext } from "react";
import { UserContext } from "../utils/UserContext";
import { Navigate, Outlet } from "react-router-dom";


export const AuthGuardPage = () => {
    const {userInfo} = useContext(UserContext);
    const isLogedin = userInfo.isLogedin;
    // if user is not login, link to homepage
    if (!isLogedin) {
        return <Navigate to="/login" replace/>;
    }
    return (<Outlet></Outlet>);
};
