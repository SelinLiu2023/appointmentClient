import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
export const MessageContext = createContext();
export const MessageContextProvider = ({children})=>{
    const [message, setMessage] = useState({text:"",isSuccess:false});
    const [eventNewStatus, setEventNewStatus] = useState(false);
    const [invitationNewStatus, setInvitationNewStatus] = useState(false);
    const {userInfo} = useContext(UserContext);
    useEffect(()=>{
        console.log("invitationNewStatus",invitationNewStatus)
    },[invitationNewStatus]);
    useEffect(()=>{
        console.log("eventNewStatus",eventNewStatus)
    },[eventNewStatus]);
    useEffect(()=>{
        const updatedEvents = userInfo.createdEvents.filter(event=> event?.status === 1 && event?.isRead === false);
        if(updatedEvents.length > 0){
            setEventNewStatus(true);
        }else{
            setEventNewStatus(false);
        }
   
        const updatedInvitations = userInfo.receivedEvents.filter(event=>  (event?.status === 0 || event?.status === 1) && event?.isRead === false);
        if(updatedInvitations.length > 0){
            setInvitationNewStatus(true);
        }else{
            setInvitationNewStatus(false);
        }
    },[userInfo]);
    return (
        <MessageContext.Provider value={{message, setMessage, eventNewStatus, setEventNewStatus, invitationNewStatus}}>{children}</MessageContext.Provider>
    );
}

