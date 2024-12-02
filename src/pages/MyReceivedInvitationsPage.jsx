
import { useContext,useEffect } from "react";
import { UserContext } from "../utils/UserContext";
import { InvitationItem } from "../components/InvitationItem";
import { getUser } from "../utils/fetch.js";
export const MyReceivedInvitationsPage =()=>{
    const {userInfo, userInfoDispatch} = useContext(UserContext);
    const {receivedEvents} = userInfo;
    console.log("MyReceivedInvitationsPage receivedEvents");
    useEffect(()=>{
        console.log("MyCreatedEventsPage");
                if(userInfo.isLogedin){
            // console.log("fetch event to go ");

            async function fetchUser(){
                const response = await getUser(userInfo._id);
                console.log("response", response)
                userInfoDispatch({ type: 'UPDATE_FETCH', payload: response});
                
            }
            fetchUser();
        }

    },[]);

    return(
        <div>
                        
            {receivedEvents.length === 0 ?
            <p>Keine neuen Event-Einladungen.</p> :
            <div>
                {
                    receivedEvents.map(event=>(
                        <InvitationItem key={event._id} event={event}></InvitationItem>
                    ))
                }
            </div>
            }
        </div>
    );
}