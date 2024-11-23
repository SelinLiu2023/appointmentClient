import React, { useContext, useState, useEffect } from 'react';
import { ProcessBar } from '../components/ProcessBar';
import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";
import { Time } from "../components/Time";
import { Address } from "../components/Address";
import { Description } from "../components/Description";
import { Gasts } from "../components/Gasts";
import { UserContext } from "../utils/UserContext";
import { NewAppointmentContext } from "../utils/NewAppointmentContext";
import { useNavigate } from "react-router-dom";

export const CreateNewAppointmentPage = () => {
    const {userInfo} = useContext(UserContext);
    const [gotoNextStep, setGotoNextStep] = useState(false);
    const [isStepCompleted, setStepCompleted] = useState(false);
    const [step, setStep] = useState(1);
    const totalSteps = 4;
    const initState = {
        createdBy : userInfo.userName,
        title: "",
        contact: "",
        startTime: "",
        endTime: "",
        address: "",
        description: "",
        gasts:[],
        wishes:{
            title: "",
            wishesList: []
        },
    };
    const [newAppointment, setNewAppointment] = useState(initState);
    const navigator = useNavigate();

    useEffect(()=>{
        console.log(newAppointment);
    }, [newAppointment]);
    useEffect(()=>{
        if(isStepCompleted===true){
            setStep(prev=>prev + 1);
            setStepCompleted(false);
        }
    },[isStepCompleted]);

    const setNextStep = ()=>{
        setGotoNextStep(true);
    };
    const setPrevStep = ()=>{
        setStepCompleted(false);
        setStep(prev=>prev - 1);
    };
    const closeModel= ()=>{
        setNewAppointment(initState);
        navigator("/main");
    };
    return (
        <div className='w-screen h-screen fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 flex-col'>

            <div onClick={e => e.stopPropagation()}
            className="relative w-3/4 max-w-xl h-3/4 flex flex-col justify-center items-center bg-gray-100 p-6 rounded-lg shadow-md"
            >
            
                <button onClick={closeModel} 
                className="absolute top-3 right-3 text-gray-400 hover:text-black">
                    X
                </button>
                <div  className="overflow-auto">


                    
                    {step === 1 && <Time newAppointment={newAppointment} setNewAppointment={setNewAppointment} gotoNextStep={gotoNextStep} setStepCompleted={setStepCompleted} setGotoNextStep={setGotoNextStep}></Time>}
                    
                    {step === 2 &&    <Address newAppointment={newAppointment} setNewAppointment={setNewAppointment} gotoNextStep={gotoNextStep} setStepCompleted={setStepCompleted} setGotoNextStep={setGotoNextStep}></Address>}

                    { step === 3 &&      <Description newAppointment={newAppointment} setNewAppointment={setNewAppointment} gotoNextStep={gotoNextStep} setStepCompleted={setStepCompleted} setGotoNextStep={setGotoNextStep}></Description>}
                    { step === 4 &&     <Gasts newAppointment={newAppointment} setNewAppointment={setNewAppointment} gotoNextStep={gotoNextStep} setStepCompleted={setStepCompleted} setGotoNextStep={setGotoNextStep}></Gasts>}

                </div>

                <button onClick={setPrevStep} 
                disabled={step <= 1} className='absolute left-2 text-gray-700 hover:text-gray-700 hover:border-b hover:border-b-gray-700 hover:border-b-[1px] transition-all duration-200 disabled:cursor-default disabled:text-gray-400 disabled:hover:text-gray-400 disabled:hover:border-none'>
                    <GoArrowLeft />
                </button>

                <button onClick={setNextStep} 
                disabled={step >= totalSteps} 
                className="absolute right-2 text-gray-700 hover:text-gray-700 hover:border-b hover:border-b-gray-700 hover:border-b-[1px] transition-all duration-200 disabled:cursor-default disabled:text-gray-400 disabled:hover:text-gray-400 disabled:hover:border-none">
                    <GoArrowRight />
                </button>
            </div>

            <ProcessBar step={step} totalSteps={totalSteps}></ProcessBar>
        </div>
    );
};
