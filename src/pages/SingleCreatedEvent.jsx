import { useEffect , useContext, useState, useRef} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvent } from "../utils/fetch.js";
import { UserContext } from "../utils/UserContext";
import { EventContent } from "../components/EventContent.jsx";
import { ModifyEvent } from "../components/ModifyEvent.jsx";
import { updateEventAsCreator, cancelEvent } from "../utils/fetch.js";
import { MessageContext } from "../utils/MessageContext.jsx";
import { IoClose } from "react-icons/io5";

export const SingleCreatedEvent = ()=>{
    const {userInfo} = useContext(UserContext);
    const {setMessage} = useContext(MessageContext);
    const [event, setEvent] = useState(null);
    const {id} = useParams();
    const [tasksNeedToDo, setTasksNeedToDo] = useState([]);
    const [editEvent, setEditEvent] = useState(false);
    const [evetEdited, setEventEdited] = useState(false);
    const [showOnlyContext, setShowOnlyContext] = useState(true);
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
    useEffect(()=>{
        const today = new Date();
        if(event && new Date(event.endTime )< today){
            setShowOnlyContext(true);
        }
        else{
            setShowOnlyContext(false);
        }
    },[event?.endTime]);
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
            setMessage({text:"Einladung update erfolgreich.", isSuccess: true })
        }else{
            setMessage({text: "Einladung update fehlgeschlagen.", isSuccess: false} );
        }
        navigator(`/main`);
    }
    const handleCancel = async()=>{
        const result = await cancelEvent(id,event);
        if(result){
            setMessage({text:"Einladung cancel erfolgreich.", isSuccess: true })
        }else{
            setMessage({text: "Einladung cancel fehlgeschlagen.", isSuccess: false});
        }
        navigator(`/main`);
    };
    return(
    <div className="text-gray-500 flex flex-col relative">
        {(event !== null && userInfo.isLogedin) &&<EventContent event={event}></EventContent>}
        {
            modalOn && 
            <ModifyEvent newAppointment={event} setNewAppointment={setEvent} setEventCreated={setEventCreated} setModalOn={setModalOn}></ModifyEvent>
        }
        { (event?.status !== -1 && !showOnlyContext) &&
        <div className="flex flex-col text-gray-300">
            <button onClick={handleEditEvent}
                    className='bg-[#2D4B73] hover:text-white p-2 rounded m-6 min-w-[100px] text-center '>Ändern</button>
            {/* <button onClick={handleQuit}
            className='bg-[#2D4B73] text-white p-2 rounded m-6 min-w-[100px] text-center '>Schließen</button> */}
            <button onClick={handleCancel}
            className='bg-[#2D4B73] hover:text-white p-2 rounded m-6 min-w-[100px] text-center '>Cancel und Schicken</button>
            {evetEdited &&
                <button onClick={handleUpdateEvent}
                className='bg-[#F2B33D] hover:text-gray-700 p-2 rounded m-6 min-w-[100px] text-center '>Beschädigen und Schicken</button>
            }
        </div>
        }
            <button onClick={handleQuit}
            className='absolute top-0 right-[-90px] w-[20px] h-[20px] border-[1px] border-gray-400 flex justify-center items-center hover:text-gray-700'><IoClose /></button>
    </div>
    );
}