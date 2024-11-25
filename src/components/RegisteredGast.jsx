import { useState } from "react";
import "../styles.css";
import { FcSearch } from "react-icons/fc";
import { fetchSearch } from "../utils/fetch";
import { UserListItem } from "./UserListItem";

export const RegisteredGast = ({setNewAppointment})=>{
    const [clicked, setClicked] = useState(false);
    const [nameInput, setNameInput] = useState("");
    const [registeredGastList, setRegisteredGastList] = useState([]);
    // const handleClick =()=>{
    //     if(nameInput.trim()=== ""){
    //         return;
    //     }
    //     setUnregisteredGastsList(prev=>(
    //         [...prev,
    //         {
    //             userName: nameInput
    //         }]
    //     ));
    //     setClicked(prev=>!prev);
    // };
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
                {/* <label htmlFor="gastName"
                    className='p-2 m-2 w-[320px] text-left text-gray-700'>
                        <p>Name</p>
                </label> */}
                <input className='text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-b border-[#2D4B73]'
                        name="gastName"
                        type="text"
                        value={nameInput}
                        placeholder="User name"
                        onChange={e=>setNameInput(e.currentTarget.value)}/>
                <div onClick={handleSearchUser}>
                    <FcSearch />
                </div>
            </div>
            {
                    registeredGastList.map((item, index)=>(
                        <UserListItem key={index} user={item} setNewAppointment={setNewAppointment}confirmed ={false}></UserListItem>
                    ))
            }
        </div>
    );
};