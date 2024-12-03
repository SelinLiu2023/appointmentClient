import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
export const UserListItem = ({user, setNewAppointment})=>{
    const [clicked, setClicked] = useState(true);
    const handleComfirm = ()=>{
        setClicked(prev=>!prev);
    };
    useEffect(()=>{
        if(!clicked){ 
            setNewAppointment(prev=>({
                ...prev,
                gasts: prev.gasts.filter(item=>item._id !== user._id),
                tasks: prev.tasks.map(task=>({
                        ...task,
                        performers: task.performers.filter(item=>item._id !== user._id)
                    }))
            }));
        }
    },[clicked]);
    return (
        <div className="flex flex-row items-center justify-cente">
            <p className='text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-b border-[#2D4B73]'>
                {user.userName}
            </p>
            <div onClick={handleComfirm} className="border-[1px] w-[15px] h-[15px]border-gray-400 flex items-center justify-center hover:cursor-pointer hover:border-blue-500">
            {clicked && <FaCheck className="text-[#8FC1B5]" />}
            </div>
        </div>
    );
};