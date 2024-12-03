import { useEffect, useState } from "react";
import "../styles.css";
import { RegisteredGast } from "./RegisteredGast";
import { UserListItem } from "./UserListItem";
export const Gasts = ({newAppointment,setNewAppointment,gotoNextStep,setStepCompleted,setGotoNextStep, totalSteps, setEventCreated})=>{
    const [warning, setWarning] = useState("");
    const [showRegiesterUsers, setShowRegiesterUsers] = useState(false);
    useEffect(()=>{
        if(gotoNextStep=== true){
            //varify if event has guests
            if(newAppointment.gasts.length === 0){
                setWarning("Bitte laden Sie die Gäste ein.")
                setStepCompleted(false);
                setGotoNextStep(false);
            }else{
                setStepCompleted(true);
                setGotoNextStep(false);
            }
        }
    },[gotoNextStep]);
    useEffect(()=>{
        //when there is guest invited, clear the warning message
        if(newAppointment.gasts.length !== 0){
            setWarning("");
        }
    },[newAppointment.gasts]);
    const handleSetEvent = ()=>{
        //click will close the modal and show the finished event form
        setEventCreated(true);
    }
    const handleShowSearch = ()=>{
        setShowRegiesterUsers(prev=> !prev);
    }
    return (
        <div className="flex flex-col justify-center">
            <div>
                <div className='p-2 m-2 w-[320px] text-left text-gray-700 border-[1px] border-[#2D4B73]' rounded>
                    <p >Eingeladen ：</p>
                    {
                        (newAppointment.gasts.length !== 0 ) && 
                            newAppointment.gasts.map(item=>(
                                <UserListItem key={item._id} user={item} setNewAppointment={setNewAppointment}></UserListItem>
                        ))
                    }
                </div>            
            </div>
            <div>
                <div className='p-2 m-2 w-[320px] text-left text-gray-700 border-b border-[#2D4B73] '>
                    <p onClick={handleShowSearch} className="text-gray-700 hover:text-blue-500 hover:cursor-pointer">Registrierte Nutzer einladen ：</p>
                        {showRegiesterUsers && <RegisteredGast setNewAppointment={setNewAppointment} newAppointment={newAppointment} ></RegisteredGast>}
                </div>
            </div>
                <div  className="mt-10 h-6 text-red-500 italic">
                <p>{warning}</p>
            </div>
            {/* //if event type is normal invitation, here can finish create event */}
            {totalSteps === 5 && 
                <button onClick={handleSetEvent} className='bg-[#2D4B73] text-white p-2 rounded m-6 text-center '>Erstellen</button>}
        </div>
    );
};