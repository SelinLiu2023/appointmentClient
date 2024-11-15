import { useContext } from "react";
import { UserContext } from "../utils/UserContext";
import { Navigate } from "react-router-dom";


export const AuthGuard = ({ children }) => {
    const {userInfo} = useContext(UserContext);
    const isLogedin = userInfo.isLogedin;
    console.log("userInfo", userInfo);
    // 如果用户未登录，导航到 HomePage
    if (!isLogedin) {
        return <Navigate to="/" replace />;
    }

    // 如果已登录，渲染子组件
    return children;
};
