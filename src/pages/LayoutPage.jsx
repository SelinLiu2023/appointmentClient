import { Outlet } from "react-router-dom";
import { UserContext } from "../utils/UserContext";
import { useContext } from "react";

export const LayoutPage = ()=>{
    const {userInfo} = useContext(UserContext);
    return (
        <div>
            <div>hello, {userInfo.userName}</div>
            <main>
                <Outlet></Outlet>
            </main>
        </div>
    );
};