import { createContext, useContext, useReducer } from "react";

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
    return (
        <UserContext.Provider value={{userInfo, userInfoDispatch}}>
            {children}
        </UserContext.Provider>
    );
};

