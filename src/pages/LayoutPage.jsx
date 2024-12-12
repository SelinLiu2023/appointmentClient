import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../utils/UserContext";
import { useContext, useState ,useRef, useEffect} from "react";
import { MessageContext } from "../utils/MessageContext";
import { FcAnswers } from "react-icons/fc";
export const LayoutPage = ()=>{
    const {userInfo, userInfoDispatch} = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null); 
    const buttonRef = useRef(null);
    const navigator = useNavigate();
    const {message, setMessage, eventNewStatus, invitationNewStatus} = useContext(MessageContext);
    const [showMessage, setShowMessage] = useState(true);
    useEffect(()=>{
        if (message.text === "") {
            setShowMessage(false);
            return;
        }
        setShowMessage(true);
        const timer = setTimeout(() => {
            setShowMessage(false);
            setMessage({text:"", isSuccess:false});
        }, 10000);
        return(()=>{
            if(timer) clearTimeout(timer);
        })
    },[message.text]);

    // click outside area will close the menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            // if click point ist not in hamburger menu , close the menu
            if (
                // menuRef.current &&
                // !menuRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    const handleLogout=()=>{
        userInfoDispatch({ type: 'SET_LOGOUT'});
        navigator("/");
    }
    return (
        <div className="relative w-full ">
            <header className="relative flex flex-row p-2 justify-center items-center bg-[#99B4BF]">
            <div className="mr-4 text-[#253C59] italic">{userInfo.userName}</div>
            <button
                ref={buttonRef}
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center justify-center w-8 h-8 bg-gray-700 text-white rounded-md focus:outline-none relative">
                <div className="space-y-1">
                    <span
                        className={`block h-[2px] w-6 bg-white transform transition-transform duration-300 ${
                            isOpen ? "rotate-90 w-[2px]" : ""
                        }`}
                    ></span>
                    <span
                        className={`block h-[2px] w-6 bg-white transition-opacity duration-300 ${
                            isOpen ? "rotate-90 w-[2px]" : ""
                        }`}
                    ></span>
                    <span
                        className={`block h-[2px] w-6 bg-white transform transition-transform duration-300 ${
                            isOpen ? "rotate-90 w-[2px]" : ""
                        }`}
                    ></span>
                </div>
                {(eventNewStatus || invitationNewStatus )&& 
                    <div className="absolute top-0 w-4 h-4 rounded-full z-50">
                        <FcAnswers />
                    </div>
                }
            </button>
            <div ref={menuRef}
                className={`absolute z-50 top-10 mt-2 mb-2  w-70 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-80" : "max-h-0"}`}>
                <ul className="flex flex-col p-2">
                    <NavLink to={"/newappointment"}
                    className="py-2 px-4 text-gray-400 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">Ein neues Event Erstellen</NavLink>

                    <NavLink to={"/mydrafts"}
                    className="py-2 px-4 text-gray-400 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">Gespeicherter Einladungsentwurf</NavLink>
                    
                    <NavLink to={"/myevents"} className="py-2 px-4 text-gray-400 hover:bg-gray-100 hover:text-gray-900 cursor-pointer flex">Erstellte Events
                    {eventNewStatus && 
                    <div className="w-4 h-4 rounded-full">
                        <FcAnswers />
                    </div>
                    }</NavLink>
                    <NavLink to={"/myinvitations"} className="py-2 px-4 text-gray-400 hover:bg-gray-100 hover:text-gray-900 cursor-pointer flex">Eingegangene Einladungen
                    {invitationNewStatus && 
                    <div className="w-4 h-4 rounded-full">
                        <FcAnswers />
                    </div>
                    }</NavLink>
                    <li onClick={handleLogout} className="py-2 px-4 text-gray-400 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">Log out</li>
                </ul>
            </div>
            {showMessage && 
                <div className={` ${message.isSuccess ? "bg-[#8FC1B5]" : "bg-[#F2762E]"} italic text-white absolute top-12 w-full`}>
                    <p className="p-1 w-full animate-slide-in whitespace-nowrap">{message.text}</p>
                </div>}
            </header>

            <main className="pt-12 flex flex-col justify-center items-center">
                <Outlet></Outlet>
            </main>
        </div>
    );
};