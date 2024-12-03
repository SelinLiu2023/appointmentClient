import { FaTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { FcPortraitMode } from "react-icons/fc";
export const TaskListItem = ({task, setNewAppointment, setEditTask})=>{
    const handleEdit=()=>{
        const editTask = task;
        setEditTask(editTask);
            setNewAppointment(prev=>({
                ...prev,
                tasks: prev.tasks.filter(item=>item.title !== task.title)
            }));
    }
    const handleTrash=()=>{
        setNewAppointment(prev=>({
            ...prev,
            tasks: prev.tasks.filter(item=>item.title !== task.title)
        }));
    }
    return (
        <div className="flex flex-row items-center">
            <p className='text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-b border-[#2D4B73]'>
                {task.title}
            </p>
            <div className="p-2 m-2 mr-0 ml-0 mb-4 flex items-center justify-center mx-2">
            <FcPortraitMode />
            </div>
            <p className='text-gray-900 p-2 m-2 ml-0 mr-6 mb-4 text-left border-gray-300 border-b border-[#2D4B73]'>
                {task.performerCount}
            </p>
            <div onClick={handleEdit} className="p-2 my-2 mx-0 mb-4 lex items-center justify-center hover:cursor-pointer mx-2 hover:text-[#8FC1B5] ">
            <MdModeEdit />
            </div>
            <div onClick={handleTrash} className="p-2 my-2 mx-0 mb-4 flex items-center text-gray-500 justify-center hover:cursor-pointer mx-2 hover:text-[#8FC1B5] ">
            <FaTrashAlt />
            </div>
        </div>
    );
};