import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../utils/UserContext";
import { getEvent, updateEventAsGuest } from "../utils/fetch.js";
import { EventContent } from "../components/EventContent";
import { useNavigate, useParams } from "react-router-dom";
import { TaskComfirm } from "../components/TaskComfirm.jsx";
import { MessageContext } from "../utils/MessageContext.jsx";
export const SingleInvitationPage = ()=>{
    const {userInfo} = useContext(UserContext);
    const [event, setEvent] = useState(null);
    const {id} = useParams();
    const [tasksNeedToDo, setTasksNeedToDo] = useState([]);
    const navigator = useNavigate();
    const {setMessage} = useContext(MessageContext);
    let receivedEvent = useRef(null);
    useEffect(()=>{
        if(event === null && userInfo.isLogedin){
            async function fetchEvents(id){
                const response = await getEvent(id, userInfo._id);
                setEvent(response);
                receivedEvent.current = response;
                console.log("receivedEvent.current",receivedEvent.current);
            }
            fetchEvents(id);
        }
    },[userInfo.isLogedin]);
    useEffect(()=>{
        if (event && event.tasks && event.gasts.find(guest=>(guest._id === userInfo._id && guest.isJoinIn == 1))) {
            const tasks = event.tasks.filter(task=> task.performerCount > task.performers.length || task.performers.find(performer=>performer._id === userInfo._id));
            if(tasks.length > 0){
                setTasksNeedToDo(tasks);
            }        
        }
    },[event?.gasts]);
    const handleGuestAccept =()=>{
        setEvent(prevEvent => ({
            ...prevEvent,
            gasts: prevEvent.gasts.map(gast =>
                    gast._id === userInfo._id ? { ...gast, isJoinIn: 1 } : gast
            )
        }));
    };
    const handleGuestLaterDecide =()=>{
        setEvent(prevEvent => ({
            ...prevEvent,
            gasts: prevEvent.gasts.map(gast =>
            gast._id === userInfo._id ? { ...gast, isJoinIn: 0 } : gast
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
            gast._id === userInfo._id ? { ...gast, isJoinIn: -1 } : gast
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
    }
    const handleUpdateInvitation= async()=>{
        const updateInvitation = {};
        const guestReceived = receivedEvent.current.gasts.find(guest=>guest._id === userInfo._id);
        const guestUpdate = event.gasts.find(guest=>guest._id === userInfo._id);
        const tasksReceived = receivedEvent.current.tasks;
        const tasksUpdate = event.tasks;
        let sendUpdate = 0;
        switch (guestReceived.isJoinIn) {
            case 0:
                if(guestUpdate.isJoinIn === -1){
                    updateInvitation.editByCreator = false;
                    updateInvitation.guestId = guestUpdate._id;
                    updateInvitation.guestName = guestUpdate.userName;
                    updateInvitation.isJoinIn = -1;
                    updateInvitation.tasks = [];
                    updateInvitation.action = 0;
                    sendUpdate = 1;
                }else if(guestUpdate.isJoinIn === 1){
                    const tasks = [];
                    for(let task of tasksUpdate){
                        if(task.performers.find(performer=>performer._id === userInfo._id)){
                            tasks.push(task.id)
                        }
                    }
                    updateInvitation.editByCreator = false;
                    updateInvitation.guestId = guestUpdate._id;
                    updateInvitation.isJoinIn = 1;
                    updateInvitation.guestName = guestUpdate.userName;
                    updateInvitation.tasks = tasks;
                    updateInvitation.action = 1;
                    sendUpdate = 1;
                }
            case -1:
                if(guestUpdate.isJoinIn === 0){
                    updateInvitation.editByCreator = false;
                    updateInvitation.guestId = guestUpdate._id;
                    updateInvitation.guestName = guestUpdate.userName;
                    updateInvitation.isJoinIn = 0;
                    updateInvitation.tasks = [];
                    updateInvitation.action = 0;
                    sendUpdate = 1;
                }else if(guestUpdate.isJoinIn === 1){
                    const tasks = [];
                    for(let task of tasksUpdate){
                        if(task.performers.find(performer=>performer._id === userInfo._id)){
                            tasks.push(task.id)
                        }
                    }
                    updateInvitation.editByCreator = false;
                    updateInvitation.guestId = guestUpdate._id;
                    updateInvitation.isJoinIn = guestUpdate.isJoinIn;
                    updateInvitation.guestName = guestUpdate.userName;
                    updateInvitation.tasks = tasks;
                    updateInvitation.action = 1;
                    sendUpdate = 1;
                }
                break;
            case 1:
                if(guestUpdate.isJoinIn === -1 || guestUpdate.isJoinIn === 0){
                    const tasks = [];
                    for(let task of tasksReceived){
                        if(task.performers.find(performer=>performer._id === userInfo._id)){
                            tasks.push(task.id)
                        }
                    }
                    updateInvitation.editByCreator = false;
                    updateInvitation.guestId = guestUpdate._id;
                    updateInvitation.guestName = guestUpdate.userName;
                    updateInvitation.isJoinIn = guestUpdate.isJoinIn;
                    updateInvitation.tasks = tasks;
                    updateInvitation.action = -1;
                    sendUpdate = 1;
                }else if(guestUpdate.isJoinIn === 1){
                    let tasks = [];
                    for(let task of tasksUpdate){
                        const performerNew = task.performers.find(performer=>performer._id === userInfo._id);
                        const taskOld = tasksReceived.find(item=>item.id===task.id);
                        const performerOld = taskOld.performers.find(performer=>performer._id === userInfo._id);
                        if((performerNew && !performerOld) || (!performerNew && performerOld)){
                            tasks.push(task.id);
                            sendUpdate = 1; 
                        }
                    }
                    updateInvitation.editByCreator = false;
                    updateInvitation.guestId = guestUpdate._id;
                    updateInvitation.guestName = guestUpdate.userName;
                    updateInvitation.isJoinIn = 1;
                    updateInvitation.tasks = tasks;
                    updateInvitation.action = 1;
                }
                break;
            default:
                break;
        }
        if(sendUpdate){
            const result = await updateEventAsGuest(event._id, updateInvitation);
            const {updateCompleted} = result;
            if(updateCompleted){
                setMessage("Deine Bestätigung der Einladung war erfolgreich.");
            }else{
                setMessage("Deine Bestätigung der Einladung war nicht vollständig erfolgreich, möglicherweise haben andere schneller reagiert als du.");
            }
        }
        navigator("/myinvitations");
    };
    return (
        <div className="text-gray-500">
            {(event !== null && userInfo.isLogedin) && <EventContent event={event}></EventContent>}
            { event?.status !== -1 &&           
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
                            ))
                        }
                        </div>
                    }
                    <button onClick={handleUpdateInvitation}
                    className='bg-[#F2B33D] text-gray-700 p-2 rounded m-6 min-w-[100px] text-center '>Bestätigen</button>
                </div>
            }        
        </div>
    );
};