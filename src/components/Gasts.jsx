import { useContext, useEffect, useState } from "react";
import "../styles.css";
import { RegisteredGast } from "./RegisteredGast";
import { UserListItem } from "./UserListItem";

export const Gasts = ({newAppointment, setNewAppointment,gotoNextStep,setStepCompleted,setGotoNextStep, totalSteps})=>{
    // const [showInputGastName, setShowInputGastName] = useState(false);
    // const [showGastGroups, setShowGastGroups] = useState(false);
    const [showRegiesterUsers, setShowRegiesterUsers] = useState(false);
    // const [unregisteredGastsList, setUnregisteredGastsList] = useState([{}]);
    // console.log("Gast", newAppointment.gasts)

    useEffect(()=>{
        if(gotoNextStep=== true){
            setStepCompleted(true);
            setGotoNextStep(false);
        }
    },[gotoNextStep]);

    return (
        <div className="flex flex-col justify-center">
            <div>
                <div className='p-2 m-2 w-[320px] text-left text-gray-700 border-[1px] border-[#2D4B73]'>
                    <p >Eingeladen ：</p>
                    {
                    (newAppointment.gasts.length !== 0 ) && 
                    newAppointment.gasts.map((item, index)=>(
                        <UserListItem key={index} user={item} setNewAppointment={setNewAppointment}confirmed ={true}></UserListItem>
                    ))
                    }
                </div>            
            </div>
            {/* <div>
                <div className='p-2 m-2 w-[320px] text-left text-gray-700 border-b border-[#2D4B73]'>
                    <p onClick={e=>setShowGastGroups(prev=> !prev)}
                    className="text-gray-700 hover:text-blue-500 hover:cursor-pointer">Gruppenmitglieder einladen ：</p>
                </div>
            </div> */}
            <div>
                <div className='p-2 m-2 w-[320px] text-left text-gray-700 border-b border-[#2D4B73] '>
                    <p onClick={e=>setShowRegiesterUsers(prev=> !prev)} className="text-gray-700 hover:text-blue-500 hover:cursor-pointer">Registrierte Nutzer einladen ：</p>
                {showRegiesterUsers && <RegisteredGast setNewAppointment={setNewAppointment}></RegisteredGast>}
                </div>
            </div>
            {/* <div>
                <div className='p-2 m-2 w-[320px] text-left text-gray-700 border-b border-[#2D4B73]'>
                    <p  onClick={e=>setShowInputGastName(prev=> !prev)}>Nicht registrierte Gäste einladen :</p>
                    {showInputGastName && 
                    unregisteredGastsList.map((unregisteredGast, index) =>(
                        <UnregisteredGastName key={index} setUnregisteredGastsList={setUnregisteredGastsList}></UnregisteredGastName>
                    ))
                    }
                </div>
            </div> */}
    {totalSteps === 5 && <button className='bg-[#2D4B73] text-white p-2 rounded m-6 text-center '>Erstellen</button>}
        </div>
    );
};