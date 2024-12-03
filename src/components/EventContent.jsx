import { useContext} from "react";
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
        month: "long", 
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
    const GuestDecition =({isJoinIn})=>{
        if(isJoinIn === 0){
            return (<p className="bg-[#2D4B73] text-white">Noch unentschieden</p>);
        }else if(isJoinIn === 1){
            return (<p className="bg-[#007566] text-white">Annehmen</p>);
        }else{
            return (<p className="bg-[#BF8D30] text-white">Ablehnen</p>);
        }
    }
    return(
        <div className="text-gray-500">
            <p 
                className='text-2xl my-4 text-[#2D4B73]' key={"title"}>
                {event.title}
            </p>
            <div className="flex flex-row" key={"startTime"}>
                <p>Startzeit ： </p><p className="text-[#2D4B73] pl-2">{localStartTime}</p>
            </div>
            <div className="flex flex-row" key={"endTime"}>
                <p>Endzeit ： </p><p className="text-[#2D4B73] pl-2">{localEndTime}</p>
            </div>
            <div className="flex flex-row">
                <p>Eingeladen von ： </p><p className="text-[#2D4B73] pl-2">{event.creatorName}</p>
            </div>
            {(event.mobileNumber !== "") && <div className="flex flex-row" key={"mobileNumber"}>
                <p>Handynummer ： </p><p className="text-[#2D4B73] pl-2">{event.mobileNumber}</p>
            </div>}
            {(event.otherContact !== "") && <div className="flex flex-row" key={"otherContact"}>
                <p >Kontaktmöglichkeiten ： </p><p className="text-[#2D4B73] pl-2">{event.otherContact}</p>
            </div>}
            {(event.adresse !== "") && <div className="flex flex-row" key={"adresse"}>
                <p >Treffpunkt-Adresse : </p>
                <p className="text-[#2D4B73] pl-2"> {event.address}</p>
            </div>}
            {(event.description !== "") && <div className="flex flex-row" key={"description"}>
                <p>Einzelheiten:</p>
                <p className="text-[#2D4B73] pl-2">{event.description}</p>
            </div>}
            <div key={"guests"}>
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
            <div key={"tasks"}>
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
                                <p className="text-[#2D4B73]">{performer.userName}</p>
                            ))
                        }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}