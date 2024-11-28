import { useContext, useEffect } from "react";
import "../styles.css";
export const Address = ({newAppointment, setNewAppointment,gotoNextStep,setStepCompleted,setGotoNextStep})=>{
    useEffect(()=>{
        if(gotoNextStep=== true){
            setStepCompleted(true);
            setGotoNextStep(false);
        }
    },[gotoNextStep]);
    const handleChangeAddress = (e)=>{
        const { value } = e.currentTarget;

        setNewAppointment(prev=>({
            ...prev,
            address : value,
        }));
    };
    const handleChangeMobileNumber = (e)=>{
        const { value } = e.currentTarget;

        setNewAppointment(prev=>({
            ...prev,
            mobileNumber : value,
        }));
    };
    const handleChangeOtherContact = (e)=>{
        const { value } = e.currentTarget;

        setNewAppointment(prev=>({
            ...prev,
            otherContact : value,
        }));
    };
    return (
        <div>
             <label htmlFor="address"
                className='p-2 m-2 w-[320px] text-left text-gray-700'>
                    <p>Treffpunkt-Adresse</p>
            </label>
            <input className='text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-b border-[#2D4B73]'
                    name="address"
                    type="text"
                    value={newAppointment.address}
                    // placeholder="Your apointment's address"
                    onChange={handleChangeAddress}/>

            <label htmlFor="mobileNumber"
                className='p-2 m-2 w-[320px] text-left text-gray-700'>
                    <p>Handynummer</p>
            </label>
            <input className='text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-b border-[#2D4B73]'
                    name="mobileNumber"
                    type="text"
                    value={newAppointment.mobileNumber}
                    // placeholder="Your apointment's address"
                    onChange={handleChangeMobileNumber}/>

            <label htmlFor="otherContact"
                className='p-2 m-2 w-[320px] text-left text-gray-700'>
                    <p>Andere Kontaktmöglichkeiten</p>
            </label>
            <input className='text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-b border-[#2D4B73]'
                    name="otherContact"
                    type="text"
                    value={newAppointment.otherContact}
                    // placeholder="Your apointment's address"
                    onChange={handleChangeOtherContact}/>
        </div>
    );
};