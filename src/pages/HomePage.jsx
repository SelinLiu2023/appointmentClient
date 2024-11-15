import { NavLink } from "react-router-dom";
import "../styles.css";


export const HomePage = ()=>{

    return (
        <div className='flex flex-col items-center justify-center h-full w-full'>
        <NavLink to="/login" className='bg-blue-500 text-white p-2 rounded m-2 min-w-150 text-center'>Anmelden</NavLink>
        <NavLink to="/registration" className='bg-blue-500 text-white p-2 rounded m-2 min-w-150 text-center'>Registieren</NavLink>
  
        </div>
    );
};