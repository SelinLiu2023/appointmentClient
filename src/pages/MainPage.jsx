import { NavLink, Outlet } from "react-router-dom";
import "../styles.css";

export const MainPage = ()=>{

    return (
        <div className="flex flex-col">
            <NavLink to="/newappointment" className='bg-[#2D4B73] text-white p-2 rounded m-6 min-w-150 text-center'>Ein neues Event erstellen</NavLink>

            <NavLink to="/myevents" className='bg-[#2D4B73] text-white p-2 rounded m-6 min-w-150 text-center'>Erstellte Events</NavLink>

            <NavLink to="/myinvitations" className='bg-[#2D4B73] text-white p-2 rounded m-6 min-w-150 text-center'>Eingegangene Einladungen</NavLink>
        </div>
    );
};