import { useContext } from "react";
import { UserContext } from "../utils/UserContext";
import { Navigate, Outlet } from "react-router-dom";


export const AuthGuardPage = () => {
    const {userInfo} = useContext(UserContext);
    const isLogedin = userInfo.isLogedin;
    console.log("userInfo", userInfo);
    // 如果用户未登录，导航到 HomePage
    if (!isLogedin) {
        return <Navigate to="/login" replace/>;
    }

    // 如果已登录，渲染子组件
    return (<Outlet></Outlet>);
};
