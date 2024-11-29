import { useContext, useState, useEffect } from "react";
import { UserContext } from "../utils/UserContext";
import { getEvent } from "../utils/fetch.js";
import { EventContent } from "../components/EventContent";
import { useParams } from "react-router-dom";
import { TaskComfirm } from "../components/TaskComfirm.jsx";
export const SingleInvitationPage = ()=>{
    const {userInfo} = useContext(UserContext);
    const [event, setEvent] = useState(null);
    const {id} = useParams();
    const [tasksNeedToDo, setTasksNeedToDo] = useState([]);
    useEffect(()=>{
    
        if(event === null){
            async function fetchEvents(id){
                const result = await getEvent(id, userInfo._id);
                setEvent(result);
            }
            fetchEvents(id);
    
        }
    },[]);

    // useEffect(()=>{
    //     const tasks = event.tasks.filter(task=> task.performerCount > task.performers.length);
    //     if(tasks.length > 0){
    //         setTasksNeedToDo(tasks);
    //     }
    // },[event.tasks]);
  
    useEffect(()=>{
        if (event && event.tasks && event.gasts.find(guest=>(guest._id === userInfo._id && guest.isJoinIn == "joinedin"))) {
            const tasks = event.tasks.filter(task=> task.performerCount > task.performers.length);
            if(tasks.length > 0){
                setTasksNeedToDo(tasks);
            }        
        }
    
    },[event?.gasts]);

    const handleGuestAccept =()=>{
        setEvent(prevEvent => ({
            ...prevEvent,
            gasts: prevEvent.gasts.map(gast =>
                    gast._id === userInfo._id ? { ...gast, isJoinIn: "joinedin" } : gast
            )
        }));

    };
    const handleGuestLaterDecide =()=>{
        setEvent(prevEvent => ({
            ...prevEvent,
            gasts: prevEvent.gasts.map(gast =>
            gast._id === userInfo._id ? { ...gast, isJoinIn: "waitingForAnswer" } : gast
            )
        }));
        setTasksNeedToDo([])
        let taskTaked = null;
        for(let item of event.tasks){
            taskTaked = item.performers.find(performer=>performer._id === userInfo._id)
            if(taskTaked){
                setEvent(prevEvent => ({
                    ...prevEvent,
                    tasks: prevEvent.tasks.map(task =>
                                    task.id === item.id ? { ...task, 
                                        performers: task.performers.filter(performer=>performer._id !== userInfo._id)
                                        }: 
                                        task
                    )
                }));
            }
        }

    }
    const handleGuestReject =()=>{
        setEvent(prevEvent => ({
            ...prevEvent,
            gasts: prevEvent.gasts.map(gast =>
            gast._id === userInfo._id ? { ...gast, isJoinIn: "NotJoinedin" } : gast
            )
        }));
        setTasksNeedToDo([])
        let taskTaked = null;
        for(let item of event.tasks){
            taskTaked = item.performers.find(performer=>performer._id === userInfo._id)
            if(taskTaked){
                setEvent(prevEvent => ({
                    ...prevEvent,
                    tasks: prevEvent.tasks.map(task =>
                                    task.id === item.id ? { ...task, 
                                        performers: task.performers.filter(performer=>performer._id !== userInfo._id)
                                        }: 
                                        task
                    )
                }));
            }
        }
    };
    const handleComfirm = (taskId, clicked)=>{
        console.log("handleComfirm taskId", taskId);
        if(!clicked){
            setEvent(prevEvent => ({
                ...prevEvent,
                tasks: prevEvent.tasks.map(task =>
                    task.id === taskId ? { ...task, 
                                    performers:[
                                        ...task.performers,
                                    {
                                        _id: userInfo._id,
                                        userName : userInfo.userName
                                    } 
                                    ]} : 
                                    task
                )
            }));       
        }else{
            console.log("take no task", id)
            setEvent(prevEvent => ({
                ...prevEvent,
                tasks: prevEvent.tasks.map(task =>
                                task.id === taskId ? { ...task, 
                                    performers: task.performers.filter(performer=>performer._id !== userInfo._id)
                                    }: 
                                    task
                )
            }));       
        }

        // const tasks = event.tasks.filter(task=> task.performerCount > task.performers.length);
        // if(tasks.length > 0){
        //     setTasksNeedToDo(tasks);
        // }
    }

    return (
        <div className="text-gray-500">
            {event!==null && <EventContent event={event}></EventContent>}
            {/* <p>{event.title}</p> */}
            <div className="bg-[#8FC1B5] w-full min-w-[400px] px-1 pb-6 mb-10 flex flex-col  items-center justify-center">
                <div className="flex flex-col mt-4">
                    <div onClick={handleGuestReject}
                    className='bg-[#2D4B73] text-white p-2 rounded m-1 min-w-150 text-center '>Event Anlehnen</div>
                    <div onClick={handleGuestAccept}
                    className='bg-[#2D4B73] text-white p-2 rounded m-1 min-w-150 text-center'>Event Annehmen</div>
                    <div onClick={handleGuestLaterDecide}
                    className='bg-[#2D4B73] text-white p-2 rounded m-1 min-w-150 text-center'>Später Entscheiden</div>
                </div>
                {tasksNeedToDo.length >0 &&
                    <div>
                    <p className='mt-10 border-b border-black'>
                        {"Aufgaben :"}</p>
                    {tasksNeedToDo.map((task)=>(
                            <TaskComfirm key={task.id} task={task} handleComfirm={handleComfirm}></TaskComfirm>
                            // <div key={task.title} className="flex flex-col m-4">
                            // <div className="flex items-center justify-center">
                            //     <p className="mr-4 text-[#2D4B73]">{task.title}</p>
                            //     <div onClick={()=>handleComfirm(task.title)} className="border-[1px] w-[15px] h-[15px] border-gray-400 flex items-center justify-center hover:cursor-pointer hover:border-blue-500">
                            //     {clicked && <FcCheckmark />}
                            //     </div>
                            // </div>
                            // <p className="mr-4 text-[#2D4B73]">{task.description}</p>
                            // </div>
                        ))
                    }
                    </div>
                }
                <button className='bg-[#F2B33D] text-gray-700 p-2 rounded m-6 min-w-[100px] text-center '>Bestätigen</button>
            </div>
        </div>
        
    );
};