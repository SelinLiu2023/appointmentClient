import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
export const EventItem = ({event})=>{
    const [statusFlag,setStatusFlag] = useState("readed");
    useEffect(()=>{
        if(event.status === 1 && event.isRead === false){
            setStatusFlag("updated");
        }else if(event.status === -1){
            setStatusFlag("canceled");
        }else{
            setStatusFlag("readed");
        }
        console.log("event.status",event.status)
        console.log("event.isRead",event.isRead)
        console.log("statusFlag",statusFlag)

    },[event]);
    const EventStatus=()=>{
        if(statusFlag === "updated"){
            return (
                <div className="animate-swing ml-6 text-xs bg-[#8FC1B5] w-[45px] h-[30px flex justify-center items-center rounded">
                    Update
                </div>
            );
        }
    }
    return (
        <NavLink to={`/event/${event._id}`} className="text-gray-500 p-2 m-2 mb-4 text-left border-gray-300 border-[#03588C] w-[300px] my-4">
            <div className="text-2xl my-4 text-[#2D4B73] flex ">
                <p>{event.title}</p>
                <EventStatus></EventStatus>
            </div>
            <div className="flex flex-row">
                <p>Startzeit ： </p><p className="text-[#2D4B73]">{event.startTime}</p>
            </div>
            <div className="flex flex-row">
                <p>Startzeit ： </p><p className="text-[#2D4B73]">{event.startTime}</p>
            </div>
        </NavLink>
    );
}