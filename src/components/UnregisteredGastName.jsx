import { useState } from "react";
import "../styles.css";

export const UnregisteredGastName = ({setUnregisteredGastsList})=>{
    const [clicked, setClicked] = useState(false);
    const handleClick =()=>{
        if(nameInput.trim()=== ""){
            return;
        }
        setUnregisteredGastsList(prev=>(
            [...prev,
            {
                userName: nameInput
            }]
        ));
        setClicked(prev=>!prev);
    }

    const [nameInput, setNameInput] = useState("");
    return (
        <div className="flex flex-row items-center justify-center">
            {/* <label htmlFor="gastName"
                className='p-2 m-2 w-[320px] text-left text-gray-700'>
                    <p>Name</p>
            </label> */}
            <input className='text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-b border-[#2D4B73]'
                    name="gastName"
                    type="text"
                    value={nameInput}
                    placeholder="Gast Namen"
                    required
                    onChange={e=>setNameInput(e.currentTarget.value)}/>
            {/* <ComfirmInvitation clicked={clicked} handleClick={handleClick}></ComfirmInvitation> */}
        </div>
    );
};