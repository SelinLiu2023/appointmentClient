import React, { useState, useEffect } from 'react';
import { ProcessBar } from '../components/ProcessBar';
import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";
import { Time } from "../components/Time";
import { Address } from "../components/Address";
import { Description } from "../components/Description";
import { Gasts } from "../components/Gasts";
import { Title } from '../components/Title';
import { Tasks } from '../components/Tasks';
import { IoClose } from "react-icons/io5";

export const ModifyEvent =({newAppointment, setNewAppointment, setEventCreated, setModalOn})=>{
    const [gotoNextStep, setGotoNextStep] = useState(false);
    const [isStepCompleted, setStepCompleted] = useState(false);
    const [step, setStep] = useState(1);
    const [totalSteps, setTotalSteps] = useState(6);
    useEffect(()=>{
        //isStepCompleted is seted by StepComponent. when click "next step", they will varify data and //set isStepCompleted as true or false.
        //if isStepCompleted is true, means current data is varified, we can go to next step. reset isStepCompleted for next step.
        if(isStepCompleted===true){
            setStep(prev=>prev + 1);
            setStepCompleted(false);
        }
    },[isStepCompleted]);
    useEffect(()=>{
        //generalEvent don't need "tasks", has les steps
        if(newAppointment.type==="generalEvent"){
            setTotalSteps(5);
        }else{
            setTotalSteps(6);
        }
    },[newAppointment.type]);
    const setNextStep = ()=>{
        // this will trigger StepComponent to varify input data.
        setGotoNextStep(true);
    };
    const setPrevStep = ()=>{
        //in case user want to go to previous step to modify, reset isStepCompleted to allow it varify new input data again. 
        setStepCompleted(false);
        setStep(prev=>prev - 1);
    };
    const closeModel= ()=>{
        setModalOn(false);
    };
    return (
        <div className='w-screen h-screen fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 flex-col'>
            <div onClick={e => e.stopPropagation()}
            className="relative w-3/4 max-w-xl h-3/4 flex flex-col justify-center items-center bg-gray-100 p-6 rounded-lg shadow-md"
            >
                <button onClick={closeModel} 
                className="absolute top-3 right-3 text-gray-400 hover:text-black text-lg">
                    <IoClose />
                </button>
                <div  className="overflow-auto">
                    {step === 1 && <Title newAppointment={newAppointment} setNewAppointment={setNewAppointment} gotoNextStep={gotoNextStep} setStepCompleted={setStepCompleted} setGotoNextStep={setGotoNextStep}></Title>}
                    {step === 2 && <Time newAppointment={newAppointment} setNewAppointment={setNewAppointment} gotoNextStep={gotoNextStep} setStepCompleted={setStepCompleted} setGotoNextStep={setGotoNextStep}></Time>}
                    
                    {step === 3 &&    <Address newAppointment={newAppointment} setNewAppointment={setNewAppointment} gotoNextStep={gotoNextStep} setStepCompleted={setStepCompleted} setGotoNextStep={setGotoNextStep}></Address>}
                    { step === 4 &&      <Description newAppointment={newAppointment} setNewAppointment={setNewAppointment} gotoNextStep={gotoNextStep} setStepCompleted={setStepCompleted} setGotoNextStep={setGotoNextStep}></Description>}
                    { step === 5 &&     <Gasts newAppointment={newAppointment} setNewAppointment={setNewAppointment} gotoNextStep={gotoNextStep} setStepCompleted={setStepCompleted} setGotoNextStep={setGotoNextStep} totalSteps={totalSteps} setEventCreated={setEventCreated}></Gasts>}
                    { step === 6 &&     <Tasks newAppointment={newAppointment} setNewAppointment={setNewAppointment} gotoNextStep={gotoNextStep} setStepCompleted={setStepCompleted} setGotoNextStep={setGotoNextStep} totalSteps={totalSteps} setEventCreated={setEventCreated}></Tasks>}
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
}