import { createContext, useEffect, useState,useMemo } from "react";

export const NewAppointmentContext = createContext();
const initState = {
        step: 1,
        totalSteps: 4,
        isStepCompleted : false,
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
        console.log("isStepCompleted", appointment.isStepCompleted)
        console.log("step", appointment.step)

    }, [appointment.isStepCompleted]);
    return(
        <NewAppointmentContext.Provider value={contextValue}>
            {children}
        </NewAppointmentContext.Provider>
    );
}