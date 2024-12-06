import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
export const InvitationItem = ({event})=>{
    const [statusFlag,setStatusFlag] = useState("readed");
    const [canceled, setCanceled] = useState(false);

    useEffect(()=>{
        if(event.status === 1 && event.isRead === false){
            setStatusFlag("updated");
        }else if(event.status === 0 && event.isRead === false){
            setStatusFlag("new");
        }else if(event.status === -1){
            setStatusFlag("canceled");
            setCanceled(true);

        }else{
            setStatusFlag("readed");
        }
    },[event]);
    const EventStatus=()=>{
        if(statusFlag === "updated"){
            return (
                <div className="animate-swing ml-6 text-xs bg-[#8FC1B5] w-[45px] h-[30px flex justify-center items-center rounded">
                    Update
                </div>
            );
        }else if(statusFlag === "new"){
            return(
                <div className="animate-swing ml-6 text-xs bg-[#F2B33D] w-[45px] h-[30px flex justify-center items-center rounded" >
                    Neu
                </div>
            );
        }else if(statusFlag === "canceled"){
            return (
                <div className="ml-6 text-xs bg-[#8FC1B5] w-[55px] h-[30px flex justify-center items-center rounded">
                    Canceled
                </div>
            );
        }
    }
    return (
        <NavLink to={`/invitation/${event._id}`} className="text-gray-500 hover:text-gray-700 p-2 m-2 mb-4 text-left border-gray-300 border-[#03588C] w-[300px] my-4">
            <div className="text-2xl my-4 flex">
                <p className={`${canceled ? "line-through text-gray-400" : "text-[#2D4B73"}`}>{event.title}</p>
                <EventStatus></EventStatus>
            </div>
            <div className="flex flex-row">
                <p className={`${canceled ? "line-through text-gray-400" : "text-[#2D4B73"}`}>Startzeit ： </p><p className={`${canceled ? "line-through text-gray-400" : "text-[#2D4B73"}`}>{event.startTime}</p>
            </div>
            <div className="flex flex-row">
                <p className={`${canceled ? "line-through text-gray-400" : "text-[#2D4B73"}`}>Endzeit ： </p><p className={`${canceled ? "line-through text-gray-400" : "text-[#2D4B73"}`}>{event.startTime}</p>
            </div>
            <div className="flex flex-row">
                <p className={`${canceled ? "line-through text-gray-400" : "text-[#2D4B73"}`}>Eingeladen von ： </p><p className={`${canceled ? "line-through text-gray-400" : "text-[#2D4B73"}`}>{event.creatorName}</p>
            </div>
        </NavLink>
    );
}