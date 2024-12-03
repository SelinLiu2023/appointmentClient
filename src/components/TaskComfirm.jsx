import { useContext, useEffect, useState } from "react";
import { FcCheckmark } from "react-icons/fc";
import { UserContext } from "../utils/UserContext";
export const TaskComfirm =({task, handleComfirm})=>{
    const {userInfo} = useContext(UserContext);
    const [clicked, setClicket] = useState(false);
    const handleClicked = ()=>{
        setClicket(prev=>!prev);
        handleComfirm(task.id, clicked);
    }
    useEffect(()=>{
        if(task.performers.find(performer=>performer._id === userInfo._id)){
            setClicket(true);
        }
    },[]);
    return (
        <div className="flex flex-col m-4">
            <div className="flex items-center justify-center">
                <p className="mr-4 text-[#2D4B73]">{task.title}</p>
                <div onClick={handleClicked} className="border-[1px] w-[15px] h-[15px] border-gray-400 flex items-center justify-center hover:cursor-pointer hover:border-blue-500">
                    {clicked && <FcCheckmark />}
                </div>
            </div>
            <p className="mr-4 text-[#2D4B73]">{task.description}</p>
        </div>
    );
};