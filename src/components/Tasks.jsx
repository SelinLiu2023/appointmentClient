import { useContext, useEffect, useState } from "react";
import "../styles.css";
import { RegisteredGast } from "./RegisteredGast";
import { UserListItem } from "./UserListItem";
import { FcCheckmark } from "react-icons/fc";
import { FcPlus } from "react-icons/fc";
import { TaskListItem } from "./TaskListItem";
import { postNewEvent } from "../utils/fetch.js";
import { useNavigate } from "react-router-dom";
import {v4 as uuid} from "uuid";

export const Tasks = ({newAppointment, setNewAppointment,gotoNextStep,setStepCompleted,setGotoNextStep, totalSteps})=>{
    // const [showInputGastName, setShowInputGastName] = useState(false);
    // const [showGastGroups, setShowGastGroups] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskPerformerCount, setTaskPerformerCount] = useState(0);
    const [editTask, setEditTask] = useState(null);
    const navigator = useNavigate();
    // const [unregisteredGastsList, setUnregisteredGastsList] = useState([{}]);
    // console.log("Gast", newAppointment.gasts)
    const [clicked, setClicked] = useState(false);

    
    useEffect(()=>{
        if(gotoNextStep=== true){
            setStepCompleted(true);
            setGotoNextStep(false);
        }
    },[gotoNextStep]);
    const handleComfirm = ()=>{
            if(newAppointment.tasks.find(task=>task.title === taskTitle) || taskTitle.trim() === ""){
                return;
            }
            setNewAppointment(prev=>({
                ...prev,
                tasks: [
                    ...prev.tasks,
                    {
                        id: uuid(),
                        title: taskTitle,
                        description: taskDescription,
                        performerCount : taskPerformerCount,
                    }
                ]
            }));
            setTaskTitle("");
            setTaskDescription("");
            setTaskPerformerCount(0);
        // else{
        //     setNewAppointment(prev=>({
        //         ...prev,
        //         tasks: prev.tasks.filter(task=>task.taskTitle !== taskTitle)
        //     }));
        // }
    };
    useEffect(()=>{
        if(editTask!== null){
            setTaskTitle(editTask.title);
            setTaskDescription(editTask.description);
            setTaskPerformerCount(editTask.performerCount);
        }
    },[editTask]);
    const handleAddEvent = async()=>{
        console.log("handleAddEvent");
        const newEventId = await postNewEvent(newAppointment);
        console.log("event response", newEventId)
        navigator(`/event/${newEventId}`);
    }
    return (
        <div className="flex flex-col justify-center">
            <div className="flex flex-col justify-center">
                <div className='p-2 m-2 w-[320px] text-left text-gray-700 border-[1px] border-[#2D4B73]'>
                    <p >Aufgabenliste ：</p>
                    {
                    (newAppointment.tasks.length !== 0 ) && 
                    newAppointment.tasks.map((task)=>(
                        <TaskListItem key={task.id} task={task} setNewAppointment={setNewAppointment} setEditTask={setEditTask} className="text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-b border-[#2D4B73]"></TaskListItem>
                    ))
                    }
                </div>            
            </div>
   
            <div className="flex flex-col items-center justify-center">
                {/* <label htmlFor="gastName"
                    className='p-2 m-2 w-[320px] text-left text-gray-700'>
                        <p>Name</p>
                </label> */}
                <div className="flex flex-row justify-center items-center">
                    <input className='text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-b border-[#2D4B73]'
                            name="taskTitle"
                            type="text"
                            value={taskTitle}
                            placeholder="Aufgabe"
                            onChange={e=>setTaskTitle(e.currentTarget.value)}/>
                    <div onClick={handleComfirm}
                    className="w-[15px] h-[15px]  flex items-center justify-center hover:cursor-pointer hover:border-blue-500">
                    <FcPlus />
                </div>
 
                <div onClick={handleComfirm}
                className="w-[15px] h-[15px]  flex items-center justify-center hover:cursor-pointer hover:border-blue-500">
                </div>
      
                </div>
                <p className="my-2"> benötigte Personenanzahl</p>
                <input className='text-gray-900 w-10 p-2 m-2 mb-4 text-left border-gray-300 border-b border-[#2D4B73]'
                            name="taskPerformerCount"
                            type="number"
                            value={taskPerformerCount}
                            placeholder="benötigte Personenanzahl"
                            onChange={e=>setTaskPerformerCount(e.currentTarget.value)}/>
                    <textarea name="taskDescription" cols="25" rows="5"
                    value={taskDescription}
                    placeholder="Detaillierte Beschreibung"
                    onChange={e=>setTaskDescription(e.currentTarget.value)}
                    className='text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-[#2D4B73]'/>
                </div>

       {totalSteps === 6 && <button onClick={handleAddEvent} className='bg-[#2D4B73] text-white p-2 rounded m-6 text-center '>Erstellen</button>}
        </div>
    );
};