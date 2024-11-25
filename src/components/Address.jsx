import { useContext, useEffect } from "react";
import "../styles.css";
export const Address = ({newAppointment, setNewAppointment,gotoNextStep,setStepCompleted,setGotoNextStep})=>{
    useEffect(()=>{
        if(gotoNextStep=== true){
            setStepCompleted(true);
            setGotoNextStep(false);
        }
    },[gotoNextStep]);
    const handleChange = (e)=>{
        const { value } = e.currentTarget;

        setNewAppointment(prev=>({
            ...prev,
            address : value,
        }));
    };
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
                    onChange={handleChange}/>
        </div>
    );
};