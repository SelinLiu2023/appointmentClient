import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from "../utils/UserContext";
import { useNavigate } from "react-router-dom";
import { ModifyEvent } from '../components/ModifyEvent';
import { EventContent } from '../components/EventContent';
import { MessageContext } from '../utils/MessageContext';
import { postNewEvent } from "../utils/fetch.js";
import { createDraft } from "../utils/fetch.js";

export const CreateNewAppointmentPage = () => {
    const {userInfo} = useContext(UserContext);
    const {setMessage} = useContext(MessageContext);
    const [eventCreated,setEventCreated] =useState(false);
    //direct open modal, let user create a new event
    const [modalOn, setModalOn] = useState(true);
    const initState = {
        createdBy : userInfo._id,
        creatorName:userInfo.userName,
        title: "",
        status: 0,
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
    useEffect(()=>{
        //if event is finished( eventCreated triggered from Task or Gast), closed the modal
        //and show the eventContent
        if(eventCreated){
            setModalOn(false);
        }
    },[eventCreated]);
    useEffect(()=>{
        //if user didn't finish the event, but closed modal, then go to MainPage
        if(!modalOn && !eventCreated){
            navigator(`/main`);
        }
    },[modalOn]);
    const handleAddEvent = async()=>{
        // send POST API to server, add a event document
        const result = await postNewEvent(newAppointment);
        //this message will be shown on the top
        if(result){
            setMessage({text:"Einladung schicken erfolgreich.",isSuccess:true });
        }else{
            setMessage({text:"Einladung schicken fehlgeschlagen.",isSuccess:true });
        }
        navigator(`/main`);
    }
    const handleQuit = ()=>{
        // user finished a event, but doesn't want to send it. Click "schließen" button.
        navigator(`/main`);
    }
    const handleSaveDraft =async()=>{
        try {
            const result = await createDraft(newAppointment);
            if(result){
                setMessage({text:"Einladung speichern erfolgreich.",isSuccess:true })
            }else{
                setMessage({text:"Einladung speichern fehlgeschlagen.",isSuccess:false });
            }
        } catch (error) {
            console.log(error);
        }
        navigator(`/main`);
    };
    return (
        <div className='flex flex-col'>
            {
                modalOn &&
                <ModifyEvent newAppointment={newAppointment} setNewAppointment={setNewAppointment} setEventCreated={setEventCreated}  setModalOn={setModalOn}/>
            }
            {(!modalOn && eventCreated) &&
                <>
                <EventContent event ={newAppointment}></EventContent>
                <button onClick={handleAddEvent}
                    className='bg-[#F2B33D] text-gray-700 p-2 rounded mt-10 min-w-[100px] text-center hover:text-white'>Bestätigen und Schicken</button>
                <button onClick={handleSaveDraft}
                    className='bg-[#2D4B73] text-white p-2 rounded mt-10 min-w-[100px] text-center hover:text-gray-400'>speichern ohne Schicken</button>                
                <button onClick={handleQuit}
                    className='bg-[#2D4B73] text-white p-2 rounded mt-10 min-w-[100px] text-center hover:text-gray-400'>Schließen</button>
                </>
            }
        </div>
    );
};
