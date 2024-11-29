import { useContext, useState } from "react";
import { InputPassword } from "../components/InputPassword";
import { UserContext } from "../utils/UserContext";
import { useNavigate } from "react-router-dom";


export const RegistrationPage = ()=>{
    const {userInfoDispatch} = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");

    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [isShowWarning, setIsShowWarning] = useState(false);
    const navigator = useNavigate();
    const handleEmailInputChange = (e)=>{
        setEmail(e.currentTarget.value);
    };
    const handleUserNameInputChange = (e)=>{
        setUserName(e.currentTarget.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); // 阻止表单默认提交行为
        if(password !== rePassword){
            setIsShowWarning(true);
        }
        try {
            // 发送 POST 请求到登录 API
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, userName }),
            });
            console.log("response",response);

            if (response.ok) {
                const data = await response.json();
                // 假设后端返回 { userName: "JohnDoe", token: "jwt-token" }
                    console.log("useInfo data",data);
                // 更新全局状态
                userInfoDispatch({ type: 'SET_LOGIN', payload: data
            });
                console.log("data returned", data);
                navigator("/main");

            } else {
                // 登录失败
                const error = await response.json();
                alert(error.message || '登录失败，请重试');
            }
        } catch (error) {
            console.error('登录请求失败:', error);
            alert('无法连接到服务器');
        }
    };
    return (
        <form onSubmit={handleSubmit}  className='flex flex-col items-center justify-center h-full min-h-screen  w-full'>
                <label htmlFor="email"
                className='p-2 m-2 w-[320px] text-left text-gray-700'>
                    <p>Email{"  "}</p>
                    <input className='text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-b border-[#2D4B73]'
                    name="email"
                    type="email"
                    value={email}
                    placeholder="Your email"
                    required
                    onChange={handleEmailInputChange}/>
                    {"  "}
                </label>
                <label htmlFor="userName"
                className='p-2 m-2 w-[320px] text-left text-gray-700'>
                    <p>username{"  "}</p>
                    <input className='text-gray-900 p-2 m-2 mb-4 text-left border-gray-300 border-b border-[#2D4B73]'
                    name="userName"
                    type="text"
                    value={userName}
                    placeholder="Your username"
                    required
                    onChange={handleUserNameInputChange}/>
                    {"  "}
                </label>
                <InputPassword labelText="Password(mind.8 Zeichen)" password={password} setPassword={setPassword} setIsShowWarning={setIsShowWarning}/>
                <InputPassword labelText="Password bestätigen" password={rePassword} setPassword={setRePassword} setIsShowWarning={setIsShowWarning}/>
                <button className='bg-[#2D4B73] text-white p-2 rounded m-6 min-w-150 text-center'>
                    Submit
                </button>
                {isShowWarning && <p className="m-2">Die Passwörter stimmen nicht überein.</p>}
        </form>
    );

};