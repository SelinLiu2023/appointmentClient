import { NavLink } from "react-router-dom";

export const EventItem = ({event})=>{
    
    const handleFetchEvent=()=>{
        
    };
    return (
        <NavLink to={`/invitation/${event._id}`} className="text-gray-500 p-2 m-2 mb-4 text-left border-gray-300 border-[#03588C] w-[300px] my-4">
            <div
                className="text-2xl my-4 text-[#2D4B73]"
            >{event.title}</div>
            <div className="flex flex-row">
                <p>Startzeit ： </p><p className="text-[#2D4B73]">{event.startTime}</p>
            </div>
            <div className="flex flex-row">
                <p>Startzeit ： </p><p className="text-[#2D4B73]">{event.startTime}</p>
            </div>
            <div className="flex flex-row">
                <p>Eingeladen von ： </p><p className="text-[#2D4B73]">{event.creatorName}</p>
            </div>
        </NavLink>
    );
}