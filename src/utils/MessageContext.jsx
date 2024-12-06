import { createContext, useEffect, useState } from "react";
export const MessageContext = createContext();
export const MessageContextProvider = ({children})=>{
    const [message, setMessage] = useState({text:"",isSuccess:false});
    useEffect(()=>{
        console.log(message)
    },[message]);
    return (
        <MessageContext.Provider value={{message, setMessage}}>{children}</MessageContext.Provider>
    );
}

