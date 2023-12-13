import React, {createContext, useCallback, useState} from "react";
import {getToken, loginFN} from "../auth/authFunctions";
import {login as storageLogin, logout as storageLogout} from "../auth/authFunctions";
import {signal} from "@preact/signals-react";

interface ContextProps {
    loggedIn: boolean;
    login: loginFN;
    logout: () => void;

}
export const AuthContext = createContext<ContextProps>({loggedIn: false, login: (token,email,password) => {}, logout: () => {} });

interface Props{
    children : React.ReactNode
}

const loggedIn = signal(getToken()!==null);

const login = (token:string, email:string, password:string) => {
    loggedIn.value = true;
    storageLogin(token, email, password);
}

const logout = () => {
    loggedIn.value = false;
    storageLogout();
}

export const AuthContextProvider: React.FC<Props> = ({children}) => {

    //const [loggedIn, setLoggedIn] = useState<boolean>(getToken() !== null);



    return <AuthContext.Provider value={{loggedIn:loggedIn.value, login, logout}}>
        {children}
    </AuthContext.Provider>
}