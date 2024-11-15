
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FiEye } from "react-icons/fi";
import { useState } from 'react';
import { IoEyeOffOutline } from "react-icons/io5";
export const InputPassword = ({password, setPassword})=>{
    // const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleInputChange = (e)=>{
        setPassword(e.currentTarget.value);
    };
    const togglePasswordVisibility = (e)=>{
        setShowPassword(showPassword=>!showPassword);
    };
    return (
        <label htmlFor="password"
        className='bg-[#2D4B73] text-white p-2 rounded m-2 w-[320px] text-left'>
            <p>Password{"  "}</p>
            <input className='text-gray-900 p-2 rounded m-2 mb-4 text-left border-gray-300 rounded-lg'
            name="password" 
            type={showPassword?"text":"password"}
            value={password} 
            // disabled={isDisable}
            placeholder="Your password"
            required
            minLength="8"
            onChange={handleInputChange}/>
            {"  "}
            <div style={{display: "inline-block"}}
                    onClick={togglePasswordVisibility}>
            {
                showPassword ? <FiEye /> :
                <IoEyeOffOutline />
            }
            </div>
        </label>
    );
};