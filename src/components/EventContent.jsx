import { useContext,useEffect,useState } from "react";
import { UserContext } from "../utils/UserContext";

export const EventContent = ({event})=>{
    const {userInfo} = useContext(UserContext);
    let invitation = true;
    
    if(userInfo._id === event.createdBy){
        invitation = false;
    }else{
        invitation = true;
    }
    console.log("EventContent", event)
    const startTime = new Date(event.startTime);
    const localStartTime = startTime.toLocaleString("de-DE", {
        year: "numeric",
        month: "long", // 全称的月份
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    const endTime = new Date(event.endTime);
    const localEndTime = endTime.toLocaleString("de-DE", {
        year: "numeric",
        month: "long", // 全称的月份
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    console.log("EventContent",event);
    const GuestDecition =({isJoinIn})=>{
        if(isJoinIn === 0){
            return (<p className="bg-[#2D4B73] text-white">Noch unentschieden</p>);
        }else if(isJoinIn === 1){
            return (<p className="bg-[#007566] text-white">Annehmen</p>);
        }else{
                        //NotJoinedin
            return (<p className="bg-[#BF8D30] text-white">Ablehnen</p>);
        }
    }
    // const TaskTake =({task})=>{
    //     if(task.performerCount > task.performerCount.length){
    //         return (<p className="bg-[#2D4B73] text-white">Noch unentschieden</p>);
    //     }else if(isJoinIn === "joinedin"){
    //         return (<p>Annehmen</p>);
    //     }else{
    //         return (<p>Ablehnen</p>);
    //     }
    // }
    return(
        <div className="text-gray-500">
            <p 
                className='text-2xl my-4 text-[#2D4B73]'>
                {event.title}
            </p>
            <div className="flex flex-row">
                <p>Startzeit ： </p><p className="text-[#2D4B73]">{event.startTime}</p>
            </div>
            <div className="flex flex-row">
                <p>Startzeit ： </p><p className="text-[#2D4B73]">{event.startTime}</p>
            </div>
            <div className="flex flex-row">
                <p>Eingeladen von ： </p><p className="text-[#2D4B73]">{event.creatorName}</p>
            </div>
            <div className="flex flex-row">
                <p>Handynummer ： </p><p className="text-[#2D4B73]">{event.mobileNumber}</p>
            </div>
            <div className="flex flex-row">
                <p>Kontaktmöglichkeiten ： </p><p className="text-[#2D4B73]">{event.otherContact}</p>
            </div>
            <p>Treffpunkt-Adresse:</p>
            <p>{event.address}</p>
            <p>Einzelheiten:</p>
            <p>{event.description}</p>
            <div>
                <p 
                    className='mt-4 border-b border-black'>
                    {"Gäste :"}
                </p>
                {
                    event.gasts.map(gast=>(
                        <div key={gast._id} className="flex flex-row m-4">
                        <p className="text-[#2D4B73] mr-4">{gast.userName}</p>
                        <GuestDecition isJoinIn={gast.isJoinIn}/>
                        </div>
                    ))
                }
            </div>
            <div>
                <p className='mt-10 border-b border-black'>
                    {"Aufgaben :"}</p>
                {event.tasks.length >0 &&
                    event.tasks.map((task)=>(
                        <div key={task.id} className="flex flex-col m-4">
                        <p className="text-[#2D4B73] mr-4">{task.title}</p>
                        <div className="flex flex-row">
                            <p>Anzahl der Ausführenden ： </p><p className="text-[#2D4B73]">{task.performerCount}</p>
                        </div>
                        {
                            task.performerCount >0 &&  task.performers.map(performer=>(
                                <p>{performer.userName}</p>
                            ))
                        }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}