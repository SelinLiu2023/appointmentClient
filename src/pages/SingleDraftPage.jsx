import { useEffect , useContext, useState, useRef} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDraft, updateDraft, deleteDraft, postNewEvent } from "../utils/fetch.js";
import { UserContext } from "../utils/UserContext";
import { EventContent } from "../components/EventContent.jsx";
import { ModifyEvent } from "../components/ModifyEvent.jsx";
import { updateEventAsCreator } from "../utils/fetch.js";
import { MessageContext } from "../utils/MessageContext.jsx";
export const SingleDraftPage = ()=>{
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
                const response = await getDraft(id);
                setEvent(response);
                receivedEvent.current = response;
            }
            fetchEvents(id);
        }
    },[userInfo.isLogedin]);
    const handleEditDraft=()=>{
        setModalOn(true);
    };
    const handleQuit = ()=>{
        navigator(`/mydrafts`);
    }
    const setEventCreated=(status)=>{
        console.log("setEventCreated", status);
        setEventEdited(true);
        setModalOn(false);
    }
    const handleSaveDraft = async()=>{
        const result = await updateDraft(id, event);
        if(result){
            setMessage("Einladung speichern erfolgreich.")
        }else{
            setMessage("Einladung speichern fehlgeschlagen.");
        }
        navigator(`/main`);
    }
    const handleSendDraft=async()=>{
        const result = await postNewEvent(event);

        if(result){
            setMessage("Einladung erneuern erfolgreich.")
        }else{
            setMessage("Einladung erneuern fehlgeschlagen.");
        }
        await deleteDraft(id);
        navigator(`/main`);
    }
    const handleDeleteDraft =async()=>{
        const result = await deleteDraft(id);

        if(result){
            setMessage("Einladung löschen erfolgreich.")
        }else{
            setMessage("Einladung löschen fehlgeschlagen.");
        }
        navigator(`/main`);
    }
    return(
    <div className="flex flex-col">
        <div className="mb-10">
            {(event !== null && userInfo.isLogedin) &&<EventContent event={event}></EventContent>}
            {
                modalOn &&
                <ModifyEvent newAppointment={event} setNewAppointment={setEvent} setEventCreated={setEventCreated} setModalOn={setModalOn}></ModifyEvent>
            }
        </div>
        <button onClick={handleEditDraft}
                className='bg-[#2D4B73] w-[250px] text-white p-2 rounded m-2 min-w-[100px] text-center '>Ändern</button>
        <button onClick={handleDeleteDraft}
                className='bg-[#2D4B73] w-[250px] text-white p-2 rounded m-2 min-w-[100px] text-center '>Löschen</button>
        <button onClick={handleQuit}
        className='bg-[#2D4B73] w-[250px] text-white p-2 rounded m-2 min-w-[100px] text-center '>Schließen</button>
        {evetEdited ?
            <div className="flex flex-col">
            <button onClick={handleSaveDraft}
            className='bg-[#2D4B73] w-[250px] text-white p-2 rounded m-2 min-w-[100px] text-center '>Speichern ohne Schicken</button>                
            <button onClick={handleSendDraft}
                className='bg-[#F2B33D]  w-[250px] text-white p-2 rounded m-2 min-w-[100px] text-center '>Beschädigen und Schicken</button>
            </div>  :
            <div>
                <button onClick={handleSendDraft}
                className='bg-[#F2B33D]  w-[250px] text-white p-2 rounded m-2 min-w-[100px] text-center '>Beschädigen und Schicken</button>
            </div>
        }
    </div>
    );
}