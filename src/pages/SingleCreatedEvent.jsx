import { useEffect , useContext, useState, useRef} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvent } from "../utils/fetch.js";
import { UserContext } from "../utils/UserContext";
import { EventContent } from "../components/EventContent.jsx";
import { ModifyEvent } from "../components/ModifyEvent.jsx";
import { updateEventAsCreator } from "../utils/fetch.js";
import { MessageContext } from "../utils/MessageContext.jsx";
export const SingleCreatedEvent = ()=>{
    const {userInfo} = useContext(UserContext);
    const {setMessage} = useContext(MessageContext);
    const [event, setEvent] = useState(null);
    const {id} = useParams();
    const [tasksNeedToDo, setTasksNeedToDo] = useState([]);
    const [editEvent, setEditEvent] = useState(false);
    const [evetEdited, setEventEdited] = useState(false);
    const [modalOn, setModalOn] = useState(false);
    const navigator = useNavigate();
    let receivedEvent = useRef(null);
    useEffect(()=>{
        //fetch this event from server
        if(event === null && userInfo.isLogedin){
            async function fetchEvents(id){
                const response = await getEvent(id, userInfo._id);
                setEvent(response);
                receivedEvent.current = response;
            }
            fetchEvents(id);
        }
    },[userInfo.isLogedin]);
    const handleEditEvent=()=>{
        setModalOn(true);
    };
    const handleQuit = ()=>{
        navigator(`/myevents`);
    }
    const setEventCreated=(status)=>{
        console.log("setEventCreated", status);
        setEventEdited(true);
        setModalOn(false);
    }
    const handleUpdateEvent=async()=>{
        const result = await updateEventAsCreator(id,event);
        if(result){
            setMessage("Einladung erfolgreich.")
        }else{
            setMessage("Einladung fehlgeschlagen.");
        }
        navigator(`/main`);
    }
    return(
    <div>
        {(event !== null && userInfo.isLogedin) &&<EventContent event={event}></EventContent>}
        {
            modalOn && 
            <ModifyEvent newAppointment={event} setNewAppointment={setEvent} setEventCreated={setEventCreated} setModalOn={setModalOn}></ModifyEvent>
        }
        <button onClick={handleEditEvent}
                className='bg-[#2D4B73] text-white p-2 rounded m-6 min-w-[100px] text-center '>Ändern</button>
        <button onClick={handleQuit}
        className='bg-[#2D4B73] text-white p-2 rounded m-6 min-w-[100px] text-center '>Schließen</button>
        {evetEdited &&
            <button onClick={handleUpdateEvent}
            className='bg-[#F2B33D] text-white p-2 rounded m-6 min-w-[100px] text-center '>Beschädigen</button>
    }
    </div>
    );
}