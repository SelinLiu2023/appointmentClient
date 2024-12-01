import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from "../utils/UserContext";
import { useNavigate } from "react-router-dom";
import { ModifyEvent } from '../components/ModifyEvent';
import { EventContent } from '../components/EventContent';
import { MessageContext } from '../utils/MessageContext';
import { postNewEvent } from "../utils/fetch.js";

export const CreateNewAppointmentPage = () => {
    const {userInfo} = useContext(UserContext);
    const {setMessage} = useContext(MessageContext);
    const [eventCreated,setEventCreated] =useState(false);
    const [modalOn, setModalOn] = useState(true);
    const initState = {
        createdBy : userInfo._id,
        creatorName:userInfo.userName,
        title: "",
        mobileNumber: "",
        otherContact: "",
        type: "",
        startTime: "",
        endTime: "",
        address: "",
        description: "",
        gasts:[],
        wishes:[],
        tasks:[],
    };
 
    const [newAppointment, setNewAppointment] = useState(initState);
    const navigator = useNavigate();

    // useEffect(()=>{
    //     if(modalOn === false){
    //         setNewAppointment(initState);
    //         navigator("/main");
    //     }
    // }, [modalOn]);
    useEffect(()=>{
        if(eventCreated){
            setModalOn(false);
            console.log("close modal")
        }
  
    },[eventCreated]);
    useEffect(()=>{
        if(!modalOn && !eventCreated){
            navigator(`/main`);
        }
  
    },[modalOn]);
    const handleAddEvent = async()=>{
        console.log("handleAddEvent");
        const result = await postNewEvent(newAppointment);
        if(result){
            setMessage("Einladung erfolgreich.")
        }else{
            setMessage("Einladung fehlgeschlagen.");
        }
        navigator(`/main`);
    }
    const handleQuit = ()=>{
        navigator(`/main`);
    }
    return (
        <div className='flex flex-col'>
            {
                modalOn &&
                <ModifyEvent newAppointment={newAppointment} setNewAppointment={setNewAppointment} setEventCreated={setEventCreated}  setModalOn={setModalOn}></ModifyEvent> 
                
            }
            {(!modalOn && eventCreated) &&
            <>
            <EventContent event ={newAppointment}></EventContent>
            <button onClick={handleAddEvent}
                className='bg-[#F2B33D] text-gray-700 p-2 rounded mt-10 min-w-[100px] text-center '>Bestätigen</button>
            <button onClick={handleQuit}
                className='bg-[#2D4B73] text-white p-2 rounded mt-10 min-w-[100px] text-center '>Schließen</button>
                </>
            }
            
        </div>
    );
};
