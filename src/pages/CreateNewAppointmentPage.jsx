import { useContext, useEffect, useState } from "react";
import { Modal } from "../components/Modal";
import { Time } from "../components/Time";
import { Address } from "../components/Address";
import { Description } from "../components/Description";
import { Gasts } from "../components/Gasts";
import { UserContext } from "../utils/UserContext";
import { NewAppointmentContext } from "../utils/NewAppointmentContext";


export const CreateNewAppointmentPage = () => {
    // console.log("CreateNewAppointmentPage");
    const {userInfo} = useContext(UserContext);
    const {appointment, setAppointment} = useContext(NewAppointmentContext);
    // const [isModalOpen, setModalOpen] = useState(true);
    const {step, isModalOpen} = appointment;
    // const [step, setStep] = useState(1);
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
    // const closeModel = ()=>{
    //     setModalOpen(false);
    // }
    const setNextStep = ()=>{
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
    useEffect(()=>{
        console.log(newAppointment);
    }, [newAppointment]);
    return (
            <Modal >
                    
                <div>
                    {/* {step === 1 && <Time newAppointment={newAppointment} setNewAppointment={setNewAppointment} setStepCompleted={setStepCompleted}/>}
                    {step === 2 && <Address newAppointment={newAppointment} setNewAppointment={setNewAppointment} setStepCompleted={setStepCompleted}/>}
                    {step === 3 && <Description newAppointment={newAppointment} setNewAppointment={setNewAppointment} setStepCompleted={setStepCompleted}/>}
                    {step === 4 && <Gast newAppointment={newAppointment} setNewAppointment={setNewAppointment} setStepCompleted={setStepCompleted}/>} */}
                    <div style={{display: step === 1 ? "block":"none"}}>
                        <Time newAppointment={newAppointment} setNewAppointment={setNewAppointment}></Time>
                    </div>
                    <div style={{display: step === 2 ? "block":"none"}}>
                        <Address newAppointment={newAppointment} setNewAppointment={setNewAppointment}></Address>
                    </div>
                    <div style={{display: step === 3 ? "block":"none"}}>
                        <Description newAppointment={newAppointment} setNewAppointment={setNewAppointment}></Description>
                    </div>
                    <div style={{display: step === 4 ? "block":"none"}}>
                        <Gasts newAppointment={newAppointment} setNewAppointment={setNewAppointment}></Gasts>
                    </div>                
                </div>
            </Modal>
        );
};