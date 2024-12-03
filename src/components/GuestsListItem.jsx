import { useContext, useEffect, useState } from "react";
import { UserContext } from "../utils/UserContext";
export const UserListItem = ({event, setEvent})=>{
    const {userInfo} = useContext(UserContext);
    const [clicked, setClicked] = useState(confirmed);
    const {_id} = userInfo;
    const [getInvited, setInvited] = useState(false);
    if(event.gasts.find(guest=>guest._id === _id)){
        setInvited(true);
    }
    const handleComfirm = ()=>{
        setClicked(prev=>!prev);
        if(!clicked){
            setNewAppointment(prev=>({
                ...prev,
                gasts: [
                    ...prev.gasts,
                    {
                        ...user,
                        isJoinIn: 0
                    },
                ]
            }));
        }else{
            setNewAppointment(prev=>({
                ...prev,
                gasts: prev.gasts.filter(item=>item._id !== user._id)
            }));
        }
    };
    return (
        <div className="flex flex-row items-center justify-cente">
            <p className='text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-b border-[#2D4B73]'>
                {user.userName}
            </p>
            { setInvited &&
            <div>
                <button onClick={handleComfirm} className="bg-[#99B4BF] w-[50px]">
                Ablehnen
                </button>
                <button onClick={handleComfirm} className="bg-[#99B4BF] w-[50px]">
                Annehmen
                </button>
            </div>
            }
        </div>
    );
};