import { useContext, useEffect, useState } from "react";
import { InputPassword } from "../components/InputPassword";
import { UserContext } from "../utils/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
export const LoginPage = ()=>{
    const {userInfo, userInfoDispatch} = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [warning,setWarning] = useState("");
    const navigator = useNavigate();
    const handleInputChange = (e)=>{
        setEmail(e.currentTarget.value);
    };
    // useEffect(()=>{
    //     if(userInfo.isLogedin){
    //         navigator(-1);
    //     }
    // },[userInfo.isLogedin]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                //success loged in
                const data = await response.json();
                // update userInfo in UserContext
                userInfoDispatch({ type: 'SET_LOGIN', payload: data});
                navigator("/main");
            } else {
                setWarning("Anmeldung fehlgeschlagen: Benutzername oder Passwort falsch.")
            }
        } catch (error) {
            // no answer from server or other problems
            console.error('login failed:', error);
            setWarning("Anmeldung fehlgeschlagen: Netzwerk- oder Serverfehler.")
        }
    };
    return (
        <form onSubmit={handleSubmit}  
            className='flex flex-col items-center justify-center h-full min-h-screen w-full'>
            <label htmlFor="email"
                className='p-2 m-2 w-[320px] text-left text-gray-700'>
                <p>Email{"  "}</p>
                <input className='text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-b border-     [#2D4B73]'
                    name="email"
                    type="email"
                    value={email}
                    required
                    onChange={handleInputChange}/>
                    {"  "}
            </label>
            <InputPassword labelText="Password" 
                        password={password} 
                        setPassword={setPassword}/>
            <button className='bg-[#2D4B73] text-white p-2 rounded m-6 min-w-150 text-center'>
                Submit
            </button>
            <NavLink to={"/registration"}>
                <p className="italic text-[#2D4B73]">Haben Sie noch kein Konto? Registrieren Sie sich in nur einem Schritt.</p>
                <p><FaArrowRightLong /></p>
            </NavLink>
            <div  className="mt-10 h-6 text-red-500 italic">
                <p>{warning}</p>
            </div>
        </form>
    );
};