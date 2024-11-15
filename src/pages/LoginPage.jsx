import { useState } from "react";
import { InputPassword } from "../components/InputPassword";

export const LoginPage = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleInputChange = (e)=>{
        setEmail(e.currentTarget.value);
    };
    return (
        <form action="" className='flex flex-col items-center justify-center h-full w-full'>
                <label htmlFor="email"
                className='bg-[#2D4B73] text-white p-2 rounded m-2 w-[320px] text-left'>
                    <p>Email{"  "}</p>
                    <input className='text-gray-900 p-2 rounded m-2 mb-4 text-left border-gray-300 rounded-lg'
                    name="email"
                    type="email"
                    value={email}
                    placeholder="Your email"
                    required
                    onChange={handleInputChange}/>
                    {"  "}
                </label>
                <InputPassword password={password} setPassword={setPassword}/>
                <button className='bg-blue-500 text-white p-2 rounded m-2 min-w-150 text-center'>
                    Submit
                </button>
        </form>
    );
};