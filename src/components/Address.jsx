import { useContext, useEffect } from "react";
import "../styles.css";
import { NewAppointmentContext } from "../utils/NewAppointmentContext";
export const Address = ({newAppointment, setNewAppointment})=>{
    const {appointment, setAppointment} = useContext(NewAppointmentContext);
    const {gotoNextStep} = appointment;
    useEffect(()=>{
            setAppointment(prev=>(
                {
                    ...prev,
                    gotoNextStep:false,
                }
            ));
    },[]);
    useEffect(()=>{
        if(gotoNextStep=== true){
            setAppointment(prev=>(
                {
                    ...prev,
                    isStepCompleted: true,
                }
            ));
        }
    },[gotoNextStep]);
    return (
        <div>
             <label htmlFor="title"
                className='p-2 m-2 w-[320px] text-left text-gray-700'>
                    <p>Appointment address</p>
            </label>
            <input className='text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-b border-[#2D4B73]'
                    name="address"
                    type="text"
                    value={newAppointment.address}
                    placeholder="Your apointment's address"
                    required
                    onChange={e=>setNewAppointment(e.currentTarget.value)}/>

   
        </div>
    );
};