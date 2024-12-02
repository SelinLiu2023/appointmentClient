import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../utils/UserContext";
import { useContext, useState ,useRef, useEffect} from "react";
import { MessageContext } from "../utils/MessageContext";

export const LayoutPage = ()=>{
    const {userInfo, userInfoDispatch} = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null); // 引用菜单区域
    const buttonRef = useRef(null); // 引用按钮
    const navigator = useNavigate();
    const {message, setMessage} = useContext(MessageContext);
    const [showMessage, setShowMessage] = useState(true);


    useEffect(()=>{
        if (message === "") {
            setShowMessage(false);
            return;
        }
        setShowMessage(true);
        const timer = setTimeout(() => {
            setShowMessage(false);
            setMessage("");
        }, 10000);
        return(()=>{
            if(timer) clearTimeout(timer);
        })
    },[message]);

    // 点击外部区域时关闭菜单
    useEffect(() => {
        const handleClickOutside = (event) => {
            // 如果点击区域不在菜单或按钮内，关闭菜单
            if (
                // menuRef.current &&
                // !menuRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        // 添加事件监听器
        document.addEventListener("click", handleClickOutside);

        // 清理事件监听器
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    const handleLogout=()=>{
        userInfoDispatch({ type: 'SET_LOGOUT'});
        navigator("/");
    }
    return (
        <div>
            <header className="relative flex flex-row p-2 justify-center items-center bg-[#99B4BF]">
            <div className="mr-4 text-[#253C59] italic">{userInfo.userName}</div>

            <button
                ref={buttonRef}
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center justify-center w-8 h-8 bg-gray-700 text-white rounded-md focus:outline-none"
            >
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
            </button>

            <div ref={menuRef}
                className={`absolute z-50 top-10 mt-2 mb-2  w-70 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-80" : "max-h-0"}`}
            >
                <ul className="flex flex-col p-2">
                    <NavLink to={"/newappointment"}
                    className="py-2 px-4 text-gray-400 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">Ein neues Event Erstellen</NavLink>
                    <NavLink to={"/myevents"} className="py-2 px-4 text-gray-400 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">Erstellte Events</NavLink>
                    <NavLink to={"/myinvitations"} className="py-2 px-4 text-gray-400 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">Eingegangene Einladungen</NavLink>
       
                    <li onClick={handleLogout} className="py-2 px-4 text-gray-400 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">Log out</li>
                </ul>
            </div>
            </header>
            {showMessage && 
            <header className=" bg-[#F2762E] italic text-white absolute top-20 w-full sm:w-3/5">
                <p className="p-1">{message}</p>
            </header>}
            <main className="pt-12 flex flex-col justify-center items-center">
                <Outlet></Outlet>
            </main>
        </div>
    );
};