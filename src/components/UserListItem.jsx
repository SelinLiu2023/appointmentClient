import { useEffect, useState } from "react";
import { FcCheckmark } from "react-icons/fc";

export const UserListItem = ({user, setNewAppointment, confirmed})=>{
    const [clicked, setClicked] = useState(confirmed);
    const handleComfirm = ()=>{
        setClicked(prev=>!prev);
        if(!clicked){
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
        }else{
            
            setNewAppointment(prev=>({
                ...prev,
                gasts: prev.gasts.filter(item=>item._id !== user._id),
                tasks: prev.tasks.map(task=>({
                        ...task,
                        performers: task.performers.filter(item=>item._id !== user._id)
                    }))
            }));
        }
    };
    // useEffect(()=>{
    //     console.log("gasts",setNewAppointment)
  
    // },[setNewAppointment.gasts]);
    return (
        <div className="flex flex-row items-center justify-cente">
            {/* <label htmlFor="gastName"
                className='p-2 m-2 w-[320px] text-left text-gray-700'>
                    <p>Name</p>
            </label> */}
            <p className='text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-b border-[#2D4B73]'>
                {user.userName}
            </p>
  
            <div onClick={handleComfirm} className="border-[1px] w-[15px] h-[15px] border-gray-400 flex items-center justify-center hover:cursor-pointer hover:border-blue-500">
            {clicked && <FcCheckmark />}
            </div>
        </div>
    );
};