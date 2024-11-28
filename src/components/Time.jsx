import { useContext, useEffect, useState } from "react";
import "../styles.css";


export const Time = ({newAppointment, setNewAppointment,gotoNextStep,setStepCompleted,setGotoNextStep})=>{
    const [warning, setWarning] = useState("");
    // const handleInputTilteChange = (e)=>{
    //     const { value } = e.currentTarget;

    //     setNewAppointment({
    //         ...newAppointment,
    //         title:value
    //     });
    // }
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
            console.log("startDate",startDate)
            console.log("endDate",endDate)
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
            {/* <label htmlFor="title"
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
            */}
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