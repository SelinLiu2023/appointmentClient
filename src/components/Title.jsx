import { useEffect,useState } from "react";
import "../styles.css";
export const Title = ({newAppointment, setNewAppointment,gotoNextStep,setStepCompleted,setGotoNextStep})=>{
    const [warning, setWarning] = useState("");
    useEffect(()=>{
        if(gotoNextStep=== true){
            //varify if important information has been inputed
            if(newAppointment.title === "" || newAppointment.type===""){
                setWarning("Bitte geben Sie den Titel und den Typ des Events ein.")
                setStepCompleted(false);
                setGotoNextStep(false);
            }else{
                setStepCompleted(true);
                setGotoNextStep(false);
            }
        }
    },[gotoNextStep]);
    const handleChangeTitle = (e)=>{
        setWarning("");
        const { value } = e.currentTarget;
        setNewAppointment(prev=>({
            ...prev,
            title : value,
        }));
    };
    const handleChangeType = (e)=>{
        setWarning("");
        const { value } = e.currentTarget;
        setNewAppointment(prev=>({
            ...prev,
            type : value,
        }));
    };
    return (
        <div>
            <label htmlFor="title"
                className='p-2 m-2 w-[320px] text-left text-gray-700'>
                <p>Name des Events :</p>
            </label>
            <input className='text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-b border-[#2D4B73]'
                name="title"
                type="text"
                value={newAppointment.title ||""}
                onChange={handleChangeTitle}/>
            <div className="flex flex-row border-[1px] justify-center item-center">
                <label htmlFor="birthdayParty"
                    className='p-1 m-2 w-[320px] text-left text-gray-700'>
                    <p>Geburtstagsfeier (mit Wunschliste)</p>
                </label>
                <input className='text-gray-900 p-1 m-2 text-left border-gray-300 border-b border-[#2D4B73]'
                    name="type"
                    type="radio"
                    id="birthdayParty"
                    value="birthdayParty"
                    checked={newAppointment.type === "birthdayParty"}
                    onChange={handleChangeType}/>
            </div>
            <div className="flex flex-row border-[1px] justify-center item-center">
                <label htmlFor="activity"
                    className='p-1 m-2 w-[320px] text-left text-gray-700'>
                    <p>Aktivitätsfeier (mit Teilnehmeraufgaben)</p>
                </label>
                <input className='text-gray-900 p-1 m-2 text-left border-gray-300 border-b border-[#2D4B73]'
                        name="type"
                        id="activity"
                        type="radio"
                        value="activity"
                        checked={newAppointment.type === "activity"}
                        onChange={handleChangeType}/>
            </div>
            <div className="flex flex-row border-[1px] justify-center item-center">
                <label htmlFor="generalEvent"
                    className='p-1 m-2 w-[320px] text-left text-gray-700'>
                    <p>Allgemeine Feier</p>
                </label>
                <input className='text-gray-900 p-1 m-2 text-left border-gray-300 border-b border-[#2D4B73]'
                        name="type"
                        id="generalEvent"
                        type="radio"
                        value="generalEvent"
                        checked={newAppointment.type === "generalEvent"}
                        onChange={handleChangeType}/>
            </div>
            <div  className="mt-10 h-6 text-red-500 italic">
                <p>{warning}</p>
            </div>
        </div>
    );
};