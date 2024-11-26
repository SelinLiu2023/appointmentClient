import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

export const UserContext = createContext();

const initUserInfo = {
    isLogedin: false,
    userName: "",

}
function reducer(state, action) {
    switch (action.type) {
        case 'SET_LOGIN':
            return {
                ...state,
                userName: action.payload.userName,
                id: action.payload.id,
                isLogedin: true 
            };
        case "RESTORE_FROM_LOCALSTORAGE":
            return {
                ...action.payload
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
        const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
        if(storedUserInfo){
            userInfoDispatch({type: "RESTORE_FROM_LOCALSTORAGE", payload: storedUserInfo});
        }
    },[]);
    useEffect(()=>{
        if(userInfo.isLogedin){
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            console.log("localStorage",userInfo);

        }else{
            localStorage.removeItem("userInfo");
            console.log("localStorage userInfo removed")
        }

    }, [userInfo]);
    
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

