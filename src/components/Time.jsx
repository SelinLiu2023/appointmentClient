import { useEffect, useState } from "react";
import "../styles.css";
export const Time = ({newAppointment, setNewAppointment,gotoNextStep,setStepCompleted,setGotoNextStep})=>{
    const [warning, setWarning] = useState("");
    const handleInputTimeChange = (e)=>{
        setWarning("");
        const { name } = e.currentTarget;
        const { value } = e.currentTarget;
        setNewAppointment(
            {
                ...newAppointment,
                [name]: value
            }
        );
    };
    useEffect(()=>{
        if(gotoNextStep=== true){
            // varify if starttime is in future, and endtime is later than starttime
            const today = new Date();
            const startDate = new Date(newAppointment.startTime);
            const endDate = new Date(newAppointment.endTime);
            if(isNaN(startDate) || isNaN(endDate) ||startDate < today || startDate >= endDate){
                setWarning("Please input valid date.")
                setStepCompleted(false);
                setGotoNextStep(false);
            }else{
                setStepCompleted(true);
                setGotoNextStep(false);
            }
        }
    },[gotoNextStep]);
    return (
        <div>
            <label htmlFor="startTime"
                className='p-2 m-2 w-[320px] text-left text-gray-700'>
                <p>Startzeit : </p>
            </label> 
            <input className='text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-b border-[#2D4B73]'
                name="startTime"
                type="datetime-local"
                value={newAppointment.startTime}
                required
                onChange={handleInputTimeChange}/>
            <label htmlFor="startTime"
                className='p-2 m-2 w-[320px] text-left text-gray-700'>
                <p>Endzeit : </p>
            </label>
            <input className='text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-b border-[#2D4B73]'
                name="endTime"
                type="datetime-local"
                value={newAppointment.endTime}
                required
                onChange={handleInputTimeChange}/>
            <div  className="mt-10 h-6 text-red-500 italic">
                <p>{warning}</p>
            </div>
        </div>
    );
};