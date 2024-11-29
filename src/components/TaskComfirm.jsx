import { useState } from "react";
import { FcCheckmark } from "react-icons/fc";

export const TaskComfirm =({task, handleComfirm})=>{
    const [clicked, setClicket] = useState(false);
    const handleClicked = ()=>{
        setClicket(prev=>!prev);
        console.log("TaskComfirm, task.id",task.id);
        handleComfirm(task.id, clicked);
    }
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