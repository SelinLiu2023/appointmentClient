import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { getUser } from "./fetch.js";
export const UserContext = createContext();
const initUserInfo = JSON.parse(sessionStorage.getItem('userInfo')) ||  {
    isLogedin: false,
    userName: "",
}
function reducer(state, action) {
    console.log("userInfo reducer payload", action.payload)
    switch (action.type) {
        case 'SET_LOGIN':
            return {
                ...state,
                ...action.payload,
                isLogedin: true 
            };
        case 'SET_LOGOUT':
            return {
                ...state,
                isLogedin: false 
            };
        case "RESTORE_FROM_SESSIONSTORAGE":
            return {
                ...action.payload
            };
        case "UPDATE_FETCH":
            return {
                ...state,
                createdEvents: [...action.payload.createdEvents],
                receivedEvents:[...action.payload.receivedEvents]
            };
        default:
            return state;
    }
}
export const UserContextProvider = ({children})=>{
    const [userInfo, userInfoDispatch] = useReducer(reducer, initUserInfo);
    const contextValue = useMemo(() => ({ userInfo, userInfoDispatch }),
                                [userInfo]);
    useEffect(()=>{
        const sessionStorageItem = sessionStorage.getItem("userInfo");
        if(sessionStorageItem){
            const storedUserInfo = JSON.parse(sessionStorageItem);
            userInfoDispatch({type: "RESTORE_FROM_SESSIONSTORAGE", payload: storedUserInfo});
        }
        if(userInfo.isLogedin){
            async function fetchUser(){
                try {
                    const response = await getUser(userInfo._id);
                    console.log("response", response)
                    userInfoDispatch({ type: 'UPDATE_FETCH', payload: response});
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                }
            }
            // const intervalId = setInterval(() => {
            //     console.log("更新用户数据");
            //     fetchUser();
            //   }, 15000);  // 每15秒更新一次
            // return () => clearInterval(intervalId); 
        }    
    },[userInfo.isLogedin]);
    useEffect(()=>{
        console.log("sessionStorage userInfo ", userInfo)
        if(userInfo.isLogedin){
            // sessionStorage.removeItem("userInfo");
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
        }else{
            sessionStorage.removeItem("userInfo");
        }
    }, [userInfo]);
    
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

