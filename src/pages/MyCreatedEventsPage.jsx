import { useContext } from "react";
import { UserContext } from "../utils/UserContext";
import { EventItem } from "../components/EventItem";

export const MyCreatedEventsPage =()=>{
    const {userInfo} = useContext(UserContext);
    const {createdEvents} = userInfo;
    return(
        <div>
            MyReceivedInvitationsPage
            
            {createdEvents.length === 0 ?
            <p>Keine erstellten Events vorhanden.</p> :
            <div>
                {
                    createdEvents.map(event=>(
                        <EventItem key={event._id} event={event}></EventItem>
                    ))
                }
            </div>
            }
        </div>
    );
}