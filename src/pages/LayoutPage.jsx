import { Outlet } from "react-router-dom";

export const LayoutPage = ()=>{

    return (
        <div>
            <div>user</div>
            <main>
                <Outlet></Outlet>
            </main>
        </div>
    );
};