import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../utils/UserContext";
import { useContext, useState ,useRef, useEffect} from "react";

export const LayoutPage = ()=>{
    const {userInfo, userInfoDispatch} = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null); // 引用菜单区域
    const buttonRef = useRef(null); // 引用按钮
    const navigator = useNavigate();

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
                className={`absolute top-10 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40" : "max-h-0"}`}
            >
                <ul className="flex flex-col p-2">
                    <NavLink to={"/groups"}
                    className="py-2 px-4 text-gray-400 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">Meine Gruppe</NavLink>
                    <li className="py-2 px-4 text-gray-400 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">About</li>
                    <li onClick={handleLogout} className="py-2 px-4 text-gray-400 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">Log out</li>
                </ul>
            </div>
            </header>
            <main className="pt-12 flex flex-col justify-center items-center">
                <Outlet></Outlet>
            </main>
        </div>
    );
};