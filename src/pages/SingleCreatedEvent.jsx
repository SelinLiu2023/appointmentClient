import { useEffect , useContext, useState} from "react";
import { useParams } from "react-router-dom";
import { getEvent } from "../utils/fetch.js";
import { UserContext } from "../utils/UserContext";
import { EventContent } from "../components/EventContent.jsx";
export const SingleCreatedEvent = ()=>{
    const {userInfo} = useContext(UserContext);
    const [event, setEvent] = useState(null);
    const {id} = useParams();
    console.log("SingleCreatedEvent", `id: ${id}`, `userId:${userInfo._id}`)
    useEffect(()=>{
        console.log("SingleCreatedEvent fetch", `event: ${event}`, `userId:${userInfo._id}`)

        if(!userInfo._id) return;
        if(event === null){
            async function fetchEvents(id){
                const result = await getEvent(id, userInfo._id);
                setEvent(result);
            }
            fetchEvents(id);
    
        }
    },[userInfo._id]);
    useEffect(()=>{
        console.log("SingleCreatedEvent", event);
    }, [event]);
    return(
    <div>
        {event !== null &&<EventContent event={event}></EventContent>}
    </div>
    );
}