import { NavLink } from "react-router-dom";
import "../styles.css";
export const HomePage = ()=>{
    return (
        <div className='flex flex-col items-center justify-center h-full min-h-screen w-full'>
            <NavLink to="/login" className='bg-[#2D4B73] text-white p-2 rounded m-6 min-w-150 text-center '>Anmelden</NavLink>
            <NavLink to="/registration" className='bg-[#2D4B73] text-white p-2 rounded m-6 min-w-150 text-center'>Jetzt registrieren</NavLink>
        </div>
    );
};