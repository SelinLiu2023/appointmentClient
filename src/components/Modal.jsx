import React, { useContext, useState } from 'react';
import { ProcessBar } from './ProcessBar';
import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";
import { NewAppointmentContext } from '../utils/NewAppointmentContext';

export const Modal = ({children }) => {
    const {appointment, setAppointment} = useContext(NewAppointmentContext);
    const {isStepCompleted, totalSteps, step, isModalOpen} = appointment;
    if (!isModalOpen) return null;

    const setNextStep = ()=>{
        console.log("click", isStepCompleted)
        setAppointment(prev=>(
            {
                ...prev,
                gotoNextStep: true,
            }
        ));
        if(!isStepCompleted) return;
        setAppointment(prev=>(
            {
                ...prev,
                step : prev.step + 1,
            }
        ));
    };
    const setPrevStep = ()=>{
        setAppointment(prev=>(
            {
                ...prev,
                step : prev.step - 1,
            }
        ));
    };
    const closeModel= ()=>{
        setAppointment(prev=>(
            {
                ...prev,
                isModalOpen : false,
            }
        ));
    }
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
                {children}
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
