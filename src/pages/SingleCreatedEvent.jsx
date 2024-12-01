import { useEffect , useContext, useState, useRef} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvent } from "../utils/fetch.js";
import { UserContext } from "../utils/UserContext";
import { EventContent } from "../components/EventContent.jsx";
import { ModifyEvent } from "../components/ModifyEvent.jsx";
import { updateEventAsCreator } from "../utils/fetch.js";
export const SingleCreatedEvent = ()=>{
    const {userInfo} = useContext(UserContext);
    const [event, setEvent] = useState(null);
    const {id} = useParams();
    const [tasksNeedToDo, setTasksNeedToDo] = useState([]);
    const [editEvent, setEditEvent] = useState(false);
    const [evetEdited, setEventEdited] = useState(false);
    const [modalOn, setModalOn] = useState(false);
    const navigator = useNavigate();
    // const {setMessage} = useContext(MessageContext);
    let receivedEvent = useRef(null);

    // console.log("tasksNeedToDo",tasksNeedToDo)
    useEffect(()=>{
        console.log("fetch event userInfo.isLogedin", userInfo.isLogedin);
        if(event === null && userInfo.isLogedin){
            // console.log("fetch event to go ");

            async function fetchEvents(id){
                const response = await getEvent(id, userInfo._id);
                setEvent(response);
                receivedEvent.current = response;
                console.log("receivedEvent.current",receivedEvent.current);

            }
            fetchEvents(id);
        }
    },[userInfo.isLogedin]);

    // useEffect(()=>{
    //     console.log("evetEdited", editEvent);
    //     if(editEvent){
    //         console.log("evetEdited", editEvent);

    //         setModalOn(false);
    //     }
    // }, [evetEdited]);
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
    const handleUpdateEvent=()=>{
        updateEventAsCreator(id,event);
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