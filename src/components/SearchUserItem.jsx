import { useState } from "react";
import { FaPlus } from "react-icons/fa";
export const SearchUserItem = ({user, setNewAppointment, confirmed, newAppointment})=>{
    const [clicked, setClicked] = useState(confirmed);
    const handleComfirm = ()=>{
        if(!newAppointment.gasts.find(gast=>gast._id === user._id)){
            setNewAppointment(prev=>({
                ...prev,
                gasts: [
                    ...prev.gasts,
                    {
                        ...user,
                        isJoinIn: 0
                    },
                ]
            }));
        }
    };
    return (
        <div className="flex flex-row items-center justify-cente">
            <p className='text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-b border-[#2D4B73]'>
                {user.userName}
            </p>
            <div onClick={handleComfirm} className=" bg-[#8FC1B5] w-4 h-4  text-gray-500 rounded-full flex items-center justify-center hover:cursor-pointer hover:text-white">
            <FaPlus className="text-xs"/>
            </div>
        </div>
    );
};