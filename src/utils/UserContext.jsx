import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

export const UserContext = createContext();

const initUserInfo = {
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
        case "RESTORE_FROM_LOCALSTORAGE":
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
        const localStorageItem = localStorage.getItem("userInfo");
        if(localStorageItem){
            const storedUserInfo = JSON.parse(localStorageItem);
            userInfoDispatch({type: "RESTORE_FROM_LOCALSTORAGE", payload: storedUserInfo});
        }

    },[]);
    useEffect(()=>{
        console.log("localStorage userInfo ", userInfo)
        if(userInfo.isLogedin){
            // localStorage.removeItem("userInfo");
            localStorage.setItem("userInfo", JSON.stringify(userInfo));

        }else{
            localStorage.removeItem("userInfo");
        }

    }, [userInfo]);
    
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

