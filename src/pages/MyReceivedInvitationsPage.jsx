
import { useContext } from "react";
import { UserContext } from "../utils/UserContext";
import { EventItem } from "../components/EventItem";

export const MyReceivedInvitationsPage =()=>{
    const {userInfo} = useContext(UserContext);
    const {receivedEvents} = userInfo;
    console.log("MyReceivedInvitationsPage receivedEvents", receivedEvents);
    return(
        <div>
                        
            {receivedEvents.length === 0 ?
            <p>Keine neuen Event-Einladungen.</p> :
            <div>
                {
                    receivedEvents.map(event=>(
                        <EventItem key={event._id} event={event}></EventItem>
                    ))
                }
            </div>
            }
        </div>
    );
}