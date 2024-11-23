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
                userName: action.payload,
                isLogedin: true 
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
        console.log(userInfo)
    }, [userInfo]);
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

