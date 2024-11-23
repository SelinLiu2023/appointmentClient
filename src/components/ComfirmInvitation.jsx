import { useState } from "react";
import { FcCheckmark } from "react-icons/fc";
export const ComfirmInvitation = ({clicked, handleClick})=>{
  
    return(
        <div onClick={handleClick} className="border-[1px] w-[15px] h-[15px] border-gray-400 flex items-center justify-center">
            {clicked && <FcCheckmark />}
        </div>
    );
}