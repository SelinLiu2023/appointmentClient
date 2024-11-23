import { createContext, useEffect, useState,useMemo } from "react";

export const NewAppointmentContext = createContext();
const initState = {
        step: 1,
        totalSteps: 4,
        isStepCompleted : true,
        gotoNextStep: false,
        isModalOpen: true,
};

export const NewAppointmentContextProvider = ({children})=>{
    const [appointment, setAppointment] = useState(initState);
    const initNewAppointmentContext = ()=>{
        setAppointment(initState);
    };
    const contextValue = useMemo(() => ({ appointment, setAppointment,initNewAppointmentContext }),
    [appointment]);
    useEffect(()=>{
        console.log("appointment", appointment)
    }, [appointment.isModalOpen]);
    return(
        <NewAppointmentContext.Provider value={contextValue}>
            {children}
        </NewAppointmentContext.Provider>
    );
}