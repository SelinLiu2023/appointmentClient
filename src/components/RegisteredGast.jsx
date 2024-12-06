import { useState } from "react";
import "../styles.css";
import { FcSearch } from "react-icons/fc";
import { fetchSearch } from "../utils/fetch";
import { SearchUserItem } from "./SearchUserItem";
export const RegisteredGast = ({newAppointment,setNewAppointment})=>{
    const [clicked, setClicked] = useState(false);
    const [nameInput, setNameInput] = useState("");
    const [registeredGastList, setRegisteredGastList] = useState([]);
    const handleSearchUser= async()=>{
        const keywords = nameInput.trim().split(/[\s,]+/).map((kw) => kw.trim());
        console.log("handleSearchUser", keywords);
        if (keywords.length === 0) {
            return;
        }
        const result = await fetchSearch(keywords);
        if(Array.isArray(result))
            setRegisteredGastList(result);
        console.log("fetch result", registeredGastList);
    };
    return (
        <div className="flex flex-col ">
            <div className="flex flex-row items-center justify-center">
                <input className='text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-b border-[#2D4B73]'
                        name="gastName"
                        type="text"
                        value={nameInput}
                        placeholder="User name"
                        onChange={e=>setNameInput(e.currentTarget.value)}/>
                <button onClick={handleSearchUser} className="hover:text-black">
                    <FcSearch />
                </button>
            </div>
            {
                registeredGastList.map((item)=>(
                    <SearchUserItem key={item._id} user={item} setNewAppointment={setNewAppointment} confirmed ={false} newAppointment={newAppointment}></SearchUserItem>
                ))
            }
        </div>
    );
};