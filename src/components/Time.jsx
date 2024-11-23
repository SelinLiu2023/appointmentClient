import { useContext, useEffect, useState } from "react";
import "../styles.css";
import { NewAppointmentContext } from "../utils/NewAppointmentContext";


export const Time = ({newAppointment, setNewAppointment,gotoNextStep,setStepCompleted,setGotoNextStep})=>{
    const [warning, setWarning] = useState("");
    const handleInputTilteChange = (e)=>{
        setNewAppointment({
            ...newAppointment,
            title:e.currentTarget.value
        });
    }
    const handleInputTimeChange = (e)=>{
        setWarning("");

        const inputName = e.currentTarget.name;
        setNewAppointment(
            {
                ...newAppointment,
                [inputName]: e.currentTarget.value
            }
            );
    };
    // useEffect(()=>{
    //         setAppointment(prev=>(
    //             {
    //                 ...prev,
    //                 gotoNextStep:false,
    //                 isStepCompleted: false,
    //             }
    //         ));
    // },[]);
    useEffect(()=>{
        if(gotoNextStep=== true){
            const today = new Date();
            const startDate = new Date(newAppointment.startTime);
            const endDate = new Date(newAppointment.endTime);
            if(isNaN(startDate) || isNaN(endDate) ||startDate < today || startDate >= endDate){
                setWarning("Please input valid date.")
                console.log("wrong time")
                setStepCompleted(false);
                setGotoNextStep(false);

            }else{
                console.log("correct time")
                setStepCompleted(true);
                setGotoNextStep(false);
            }
        }
    },[gotoNextStep]);

    return (
        <div>
            <label htmlFor="title"
                className='p-2 m-2 w-[320px] text-left text-gray-700'>
                    <p>Appointment title</p>
            </label>
            <input className='text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-b border-[#2D4B73]'
                    name="title"
                    type="text"
                    value={newAppointment.title}
                    placeholder="Your apointment's title"
                    required
                    onChange={handleInputTilteChange}/>
            <label htmlFor="startTime"
                className='p-2 m-2 w-[320px] text-left text-gray-700'>
                    <p>Start at : </p>
            </label>
            <input className='text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-b border-[#2D4B73]'
                    name="startTime"
                    type="datetime-local"
                    value={newAppointment.startTime}
                    required
                    onChange={handleInputTimeChange}/>
            <label htmlFor="startTime"
                className='p-2 m-2 w-[320px] text-left text-gray-700'>
                    <p>End at : </p>
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