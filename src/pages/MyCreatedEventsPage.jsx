import { useContext, useEffect ,useState} from "react";
import { UserContext } from "../utils/UserContext";
import { EventItem } from "../components/EventItem";
import { getUser } from "../utils/fetch.js";
export const MyCreatedEventsPage =()=>{
    const {userInfo, userInfoDispatch} = useContext(UserContext);
    const [currentEvents, setCurrentEvents] = useState([]);
    const [oldEvents, setOldEvents] = useState([]);
    const [showOldEvents, setShowOldEvents] = useState(false);
    useEffect(()=>{
        if(userInfo.isLogedin){
            async function fetchUser(){
                const response = await getUser(userInfo._id);
                console.log("response", response)
                userInfoDispatch({ type: 'UPDATE_FETCH', payload: response});
                //sort the event by _id(as created time)
                const totay = new Date();
                setCurrentEvents(response.createdEvents.filter(item=>new Date(item.endTime) >= totay).sort((a, b) => {
                    return b._id.localeCompare(a._id);
                }));
                setOldEvents(response.createdEvents.filter(item=>new Date(item.endTime) < totay).sort((a, b) => {
                    return b._id.localeCompare(a._id);
                }));
            }
            fetchUser();
        }
    },[userInfo.isLogedin]);
    const handleClick=()=>{
        setShowOldEvents(prev=>!prev);
    };
    return(
        <div className="text-gray-500">
            <div>
                <p className="border-b-[1px] border-gray-500 ">Bevorstehendes Event</p>
                {currentEvents.length === 0 ?
                    <p>Keine erstellten Events vorhanden.</p> :
                    <div>
                        {
                            currentEvents.map(event=>(
                                <EventItem key={event._id} event={event}></EventItem>
                            ))
                        }
                    </div>
                }
            </div>
            <div>
                <button onClick={handleClick} className="border-b-[1px] border-gray-500 mt-10 hover:text-gray-700">Abgeschlossenes Event</button>
                {showOldEvents &&
                <div>     
                    {(oldEvents.length === 0)?
                    <p>Keine erstellten Events vorhanden.</p> :
                    <div>
                        {
                            oldEvents.map(event=>(
                                <EventItem key={event._id} event={event}></EventItem>
                            ))
                        }
                    </div>
                }
                </div>  }
            </div>
        </div>
    );
}