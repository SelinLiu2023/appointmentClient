import { useEffect , useContext, useState} from "react";
import { useParams } from "react-router-dom";
import { getEvents } from "../utils/fetch.js";
import { UserContext } from "../utils/UserContext";
export const SingleCreatedEvent = ()=>{
    const {userInfo} = useContext(UserContext);
    const [event, setEvent] = useState(null);
    const {id} = useParams();
    const ids = [id];
    console.log("SingleCreatedEvent", `ids: ${ids}`, `userId:${userInfo.id}`)
    useEffect(()=>{
        if(!userInfo.id) return;
        async function fetchEvents(ids){
            const events = await getEvents(ids, userInfo.id);
            console.log("SingleCreatedEvent", event);
            setEvent(events[0]);
        }
        fetchEvents(ids);
    },[userInfo.id]);
    return(
    <div>
        {event !== null && <p>{event.title}</p> }
    </div>
    );
}