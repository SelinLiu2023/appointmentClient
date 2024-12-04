import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
export const DraftItem = ({draft})=>{
    return (
        <NavLink to={`/draft/${draft._id}`} className="text-gray-500 p-2 m-2 mb-4 text-left border-gray-300 border-[#03588C] w-[300px] my-4">
            <div className="text-2xl my-4 text-[#2D4B73] flex ">
                <p>{draft.title}</p>
            </div>
            <div className="flex flex-row">
                <p className="text-[#2D4B73]">{draft.saveTime}</p>
            </div>
        </NavLink>
    );
}