import { useContext, useEffect ,useState} from "react";
import { UserContext } from "../utils/UserContext.jsx";
import { EventItem } from "../components/EventItem.jsx";
import { getUser } from "../utils/fetch.js";
import { DraftItem } from "../components/DraftItem.jsx";
export const MySavedDraftsPage =()=>{
    const {userInfo, userInfoDispatch} = useContext(UserContext);
    const [sortedEvents, setSortedEvents] = useState([]);
    useEffect(()=>{
        if(userInfo.isLogedin){
            async function fetchUser(){
                const response = await getUser(userInfo._id);
                console.log("response", response)
                userInfoDispatch({ type: 'UPDATE_FETCH', payload: response});
                //sort the event by _id(as created time)
                setSortedEvents(response.savedDrafts.sort((a, b) => {
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
                        sortedEvents.map(draft=>(
                            <DraftItem key={draft._id} draft={draft}></DraftItem>
                        ))
                    }
                </div>
            }
        </div>
    );
}