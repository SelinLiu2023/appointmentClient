import { NavLink, Outlet } from "react-router-dom";
import "../styles.css";

export const MainPage = ()=>{

    return (
        <div>
            <NavLink to="/newappointment" className='bg-[#2D4B73] text-white p-2 rounded m-6 min-w-150 text-center'>Ein neues Event erstellen</NavLink>
        </div>
    );
};