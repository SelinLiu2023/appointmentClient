import { useContext, useState } from "react";
import { InputPassword } from "../components/InputPassword";
import { UserContext } from "../utils/UserContext";
import { useNavigate } from "react-router-dom";

export const LoginPage = ()=>{
    const {userInfoDispatch} = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigator = useNavigate();
    const handleInputChange = (e)=>{
        setEmail(e.currentTarget.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); // 阻止表单默认提交行为

        try {
            // 发送 POST 请求到登录 API
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            console.log(" LoginPage login response", response);
            if (response.ok) {
                const data = await response.json();
                // 假设后端返回 { userName: "JohnDoe", token: "jwt-token" }

                // 更新全局状态
                console.log(" LoginPage login data", data);
                userInfoDispatch({ type: 'SET_LOGIN', payload: data});
                navigator("/main");
                // console.log("login response returned", data)

            } else {
                // 登录失败
                const error = await response.json();
                alert(error.message || '登录失败，请重试');
            }
        } catch (error) {
            console.error('登录请求失败:', error);
        }
    };
    return (
        <form onSubmit={handleSubmit}  className='flex flex-col items-center justify-center h-full min-h-screen w-full'>
                <label htmlFor="email"
                className='p-2 m-2 w-[320px] text-left text-gray-700'>
                    <p>Email{"  "}</p>
                    <input className='text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-b border-[#2D4B73]'
                    name="email"
                    type="email"
                    value={email}
                    placeholder="Your email"
                    required
                    onChange={handleInputChange}/>
                    {"  "}
                </label>
                <InputPassword labelText="Password" password={password} setPassword={setPassword}/>
                <button className='bg-[#2D4B73] text-white p-2 rounded m-6 min-w-150 text-center'>
                    Submit
                </button>
        </form>
    );
};