import "../styles.css";
import { useEffect } from "react";
export const Description = ({newAppointment, setNewAppointment,gotoNextStep,setStepCompleted,setGotoNextStep})=>{
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
            description : value,
        }));
    };
    return (
        <div>
            <label htmlFor="description"
                className='p-2 m-2 w-[320px] text-left text-gray-700'>
                <p>Einzelheiten : </p>
            </label>
            <textarea className='text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-b border-[#2D4B73]'
                name="description"
                value={newAppointment.description}
                cols = "30"
                rows = "5"
                onChange={handleChange}/>
        </div>
    );
};