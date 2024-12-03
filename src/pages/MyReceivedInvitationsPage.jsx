
import { useContext,useEffect,useState } from "react";
import { UserContext } from "../utils/UserContext";
import { InvitationItem } from "../components/InvitationItem";
import { getUser } from "../utils/fetch.js";
export const MyReceivedInvitationsPage =()=>{
    const {userInfo, userInfoDispatch} = useContext(UserContext);
    const [sortedEvents, setSortedEvents] = useState([]);
    console.log("MyReceivedInvitationsPage receivedEvents");
    useEffect(()=>{
        if(userInfo.isLogedin){
            async function fetchUser(){
                const response = await getUser(userInfo._id);
                console.log("response", response)
                userInfoDispatch({ type: 'UPDATE_FETCH', payload: response});
                setSortedEvents(response.receivedEvents.sort((a, b) => {
                    return b._id.localeCompare(a._id);
                }));
            }
            fetchUser();
        }
    },[userInfo.isLogedin]);
    return(
        <div>
            {sortedEvents.length === 0 ?
                <p>Keine neuen Event-Einladungen.</p> :
                <div>
                    {
                        sortedEvents.map(event=>(
                            <InvitationItem key={event._id} event={event}></InvitationItem>
                        ))
                    }
                </div>
            }
        </div>
    );
}