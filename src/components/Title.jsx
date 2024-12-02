import { useEffect } from "react";
import "../styles.css";
export const Title = ({newAppointment, setNewAppointment,gotoNextStep,setStepCompleted,setGotoNextStep})=>{
    console.log("Title");

    useEffect(()=>{
        console.log("gotoNextStep");
        if(gotoNextStep=== true){
            setStepCompleted(true);
            setGotoNextStep(false);
        }
    },[gotoNextStep]);
    const handleChangeTitle = (e)=>{
        const { value } = e.currentTarget;
        setNewAppointment(prev=>({
            ...prev,
            title : value,
        }));
    };
    const handleChangeType = (e)=>{
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
                    <p>Name des Events</p>
            </label>
            <input className='text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-b border-[#2D4B73]'
                    name="title"
                    type="text"
                    value={newAppointment.title ||""}
                    // placeholder="Your apointment's address"
                    onChange={handleChangeTitle}/>
            {/* <div  className='p-2 m-2 w-[320px] text-left text-gray-700'>
                <p > Thema des Events</p>
            </div> */}

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
                        // placeholder="Your apointment's address"
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
                        // placeholder="Your apointment's address"
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

                        // placeholder="Your apointment's address"
                        onChange={handleChangeType}/>
            </div>
        </div>
    );
};