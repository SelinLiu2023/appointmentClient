import { useContext, useEffect, useState } from "react";
import { InputPassword } from "../components/InputPassword";
import { UserContext } from "../utils/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

export const RegistrationPage = ()=>{
    const {userInfoDispatch} = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [warning,setWarning] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [isShowWarning, setIsShowWarning] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const navigator = useNavigate();
    const handleEmailInputChange = (e)=>{
        setEmail(e.currentTarget.value);
        setWarning("");
        setShowLogin(false);
    };
    const handleUserNameInputChange = (e)=>{
        setUserName(e.currentTarget.value);
        setWarning("");
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        //varify if input password twice
        if(password !== rePassword){
            setIsShowWarning(true);
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, userName }),
            });
            if (response.ok) {
                const data = await response.json();
                //after register success, automatic login
                userInfoDispatch({ type: 'SET_LOGIN', payload: data
                });
                navigator("/main");
            } else if(response.status === 409){
                // 409, email as account is already registered
                setWarning("Dieser Benutzer ist bereits registriert.");
                // git user a link to login
                setShowLogin(true);
            }else{
                //other problems
                setWarning("Anmeldung fehlgeschlagen: Netzwerk- oder Serverfehler.")
            }
        } catch (error) {
            console.error('registration failed:', error);
        }
    };
    useEffect(()=>{
        if(isShowWarning){
            setWarning("Die Passwörter stimmen nicht überein.");
        }else{
            setWarning("");
        }
    },[isShowWarning]);
    return (
        <form onSubmit={handleSubmit}  
            className='flex flex-col items-center justify-center h-full min-h-screen  w-full'>
            <label htmlFor="email"
                className='p-2 m-2 w-[320px] text-left text-gray-700'>
                <p>Email{"  "}</p>
                <input className='text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-b border-[#2D4B73]'
                name="email"
                type="email"
                value={email}
                required
                onChange={handleEmailInputChange}/>
                {"  "}
            </label>
            <label htmlFor="userName"
                className='p-2 m-2 w-[320px] text-left text-gray-700'>
                <p>Benutzername{"  "}</p>
                <input className='text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-b border-[#2D4B73]'
                name="userName"
                type="text"
                value={userName}
                required
                onChange={handleUserNameInputChange}/>
                {"  "}
            </label>
            <InputPassword labelText="Password(mind.8 Zeichen)" password={password} setPassword={setPassword} setIsShowWarning={setIsShowWarning}/>
            <InputPassword labelText="Password bestätigen" password={rePassword} setPassword={setRePassword} setIsShowWarning={setIsShowWarning}/>
            <div  className="mt-10 h-6 text-red-500 italic">
                <p>{warning}</p>
            </div>
            <button className='bg-[#2D4B73] text-white p-2 rounded m-6 min-w-150 text-center'>
                Beschädigen
            </button>
            <NavLink to={"/login"} className="mt-10 h-6 text--[#2D4B73] italic">
                {showLogin && <p>Anmelden gehen <FaArrowRightLong /></p>}
            </NavLink>
        </form>
    );

};