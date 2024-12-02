import { useContext, useEffect } from "react";
import { UserContext } from "../utils/UserContext";
import { EventItem } from "../components/EventItem";
import { getUser } from "../utils/fetch.js";

export const MyCreatedEventsPage =()=>{
    const {userInfo, userInfoDispatch} = useContext(UserContext);
    const {createdEvents} = userInfo;
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