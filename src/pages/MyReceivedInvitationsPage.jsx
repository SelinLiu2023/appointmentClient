
import { useContext,useEffect,useState } from "react";
import { UserContext } from "../utils/UserContext";
import { InvitationItem } from "../components/InvitationItem";
import { getUser } from "../utils/fetch.js";
export const MyReceivedInvitationsPage =()=>{
    const {userInfo, userInfoDispatch} = useContext(UserContext);
    const [currentEvents, setCurrentEvents] = useState([]);
    const [oldEvents, setOldEvents] = useState([]);
    const [showOldEvents, setShowOldEvents] = useState(false);

    console.log("MyReceivedInvitationsPage receivedEvents");
    useEffect(()=>{
        if(userInfo.isLogedin){
            async function fetchUser(){
                const response = await getUser(userInfo._id);
                console.log("response", response)
                userInfoDispatch({ type: 'UPDATE_FETCH', payload: response});
                const totay = new Date();

                setCurrentEvents(response.receivedEvents.filter(item=>new Date(item.endTime) >= totay).sort((a, b) => {
                    return b._id.localeCompare(a._id);
                }));
                setOldEvents(response.receivedEvents.filter(item=>new Date(item.endTime) < totay).sort((a, b) => {
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
                <p className="border-b-[1px] border-gray-500 ">Bevorstehendes Einladungen</p>
                {currentEvents.length === 0 ?
                    <p>Keine erstellten Einladungen vorhanden.</p> :
                    <div>
                        {
                            currentEvents.map(event=>(
                                <InvitationItem key={event._id} event={event}></InvitationItem>
                            ))
                        }
                    </div>
                }
            </div>
            <div>
                <button onClick={handleClick} className="border-b-[1px] hover:text-gray-700 border-gray-500 mt-10 ">Abgeschlossenes Einladungen</button>
                {showOldEvents &&
                <div>     
                    {(oldEvents.length === 0)?
                    <p>Keine erstellten Einladungen vorhanden.</p> :
                    <div>
                        {
                            oldEvents.map(event=>(
                                <InvitationItem key={event._id} event={event}></InvitationItem>
                            ))
                        }
                    </div>
                }
                </div>  }
            </div>
        </div>
    );

}