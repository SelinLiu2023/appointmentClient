import { useContext, useEffect ,useState} from "react";
import { UserContext } from "../utils/UserContext";
import { EventItem } from "../components/EventItem";
import { getUser } from "../utils/fetch.js";
export const MyCreatedEventsPage =()=>{
    const {userInfo, userInfoDispatch} = useContext(UserContext);
    const [sortedEvents, setSortedEvents] = useState([]);
    useEffect(()=>{
        if(userInfo.isLogedin){
            async function fetchUser(){
                const response = await getUser(userInfo._id);
                console.log("response", response)
                userInfoDispatch({ type: 'UPDATE_FETCH', payload: response});
                //sort the event by _id(as created time)
                setSortedEvents(response.createdEvents.sort((a, b) => {
                    return b._id.localeCompare(a._id);
                }));
            }
            fetchUser();
        }
    },[userInfo.isLogedin]);
    return(
        <div>
            {sortedEvents.length === 0 ?
                <p>Keine erstellten Events vorhanden.</p> :
                <div>
                    {
                        sortedEvents.map(event=>(
                            <EventItem key={event._id} event={event}></EventItem>
                        ))
                    }
                </div>
            }
        </div>
    );
}