import { NavLink } from "react-router-dom";
import "../styles.css";
import { useState } from "react";
import { FcSearch } from "react-icons/fc";
export const GroupsPage = ()=>{
    const [searchInput, setSearchInput] = useState("");
    const handleSearchUser= ()=>{

    };
    return (
        <div >

        <div className="flex flex-row items-center justify-center">
                <label htmlFor="searchInput"
                    className='p-2 m-2 w-[320px] text-left text-gray-700'>
                        <p>Suchen einen Benutzer</p>
                </label>
                <input className='text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-b border-[#2D4B73]'
                        name="searchInput"
                        type="text"
                        value={searchInput}
                        placeholder="User name or user email"
                        onChange={e=>setSearchInput(e.currentTarget.value)}/>
                <div onClick={handleSearchUser}>
                    <FcSearch />
                </div>
            </div>
        </div>
    );
};