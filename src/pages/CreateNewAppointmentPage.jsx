import { useContext, useEffect, useState } from "react";
import { Modal } from "../components/Modal";
import { Time } from "../components/Time";
import { Address } from "../components/Address";
import { Description } from "../components/Description";
import { Gast } from "../components/Gast";
import { UserContext } from "../utils/UserContext";


export const CreateNewAppointmentPage = () => {
    // console.log("CreateNewAppointmentPage");
    const {userInfo} = useContext(UserContext);
    const [isModalOpen, setModalOpen] = useState(true);
    const [step, setStep] = useState(1);
    const [isStepCompleted, setStepCompleted] = useState(false);
    const [newAppointment, setNewAppointment] = useState(
        {
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
        }
    );

    const totalSteps = 4;
    const closeModel = ()=>{
        setModalOpen(false);
    }
    const setNextStep = ()=>{
        setStep(step=>step + 1);
    };
    const setPrevStep = ()=>{
        setStep(step=>step - 1);
    };

    useEffect(()=>{
        if(isModalOpen === false){
            setNewAppointment({
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
            });
        }
    },[isModalOpen]);
    return (
            <Modal isOpen={isModalOpen} closeModel={closeModel} step={step} totalSteps={totalSteps} setNextStep={setNextStep} setPrevStep = {setPrevStep} isStepCompleted={isStepCompleted} setStepCompleted={setStepCompleted} >
                    
                <div>
                    {step === 1 && <Time newAppointment={newAppointment} setNewAppointment={setNewAppointment} setStepCompleted={setStepCompleted}/>}
                    {step === 2 && <Address newAppointment={newAppointment} setNewAppointment={setNewAppointment} setStepCompleted={setStepCompleted}/>}
                    {step === 3 && <Description newAppointment={newAppointment} setNewAppointment={setNewAppointment} setStepCompleted={setStepCompleted}/>}
                    {step === 4 && <Gast newAppointment={newAppointment} setNewAppointment={setNewAppointment} setStepCompleted={setStepCompleted}/>}
                </div>
            </Modal>
        );
};