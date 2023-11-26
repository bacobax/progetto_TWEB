import React, {createContext, useCallback, useState} from "react";
import {getToken, loginFN} from "../auth/authFunctions";
import {login as storageLogin, logout as storageLogout} from "../auth/authFunctions";
interface ContextProps {
    loggedIn: boolean;
    login: loginFN;
    logout: () => void;

}
export const AuthContext = createContext<ContextProps>({loggedIn: false, login: (token,email,password) => {}, logout: () => {} });

interface Props{
    children : React.ReactNode
}
export const AuthContextProvider: React.FC<Props> = ({children}) => {

    const [loggedIn, setLoggedIn] = useState<boolean>(getToken() !== null);
    const login: loginFN =useCallback ((token, email, password) => {
        setLoggedIn(true);
        storageLogin(token, email, password);
    },[]);

    const logout = useCallback(() => {
        setLoggedIn(false);
        storageLogout();
    },[]);

    return <AuthContext.Provider value={{loggedIn, login, logout}}>
        {children}
    </AuthContext.Provider>
}