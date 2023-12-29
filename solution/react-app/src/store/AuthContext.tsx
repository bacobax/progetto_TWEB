import React, {createContext, useEffect, useState} from "react";
import {getToken, getTokenDuration, loginFN} from "../auth/authFunctions";
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
    const login = (token:string, email:string, password:string, _id:string) => {
        setLoggedIn(true)
        storageLogin(token, email, password, _id);
    }

    const logout = () => {
        setLoggedIn(false)
        storageLogout();
    }

    useEffect(() => {
        const token = getToken();
        const tokenDuration = getTokenDuration();
        if(!token || !tokenDuration) return;

        if(token === "EXPIRED"){
            logout();
            return;
        }


        setTimeout(() => {
            logout();
        }, tokenDuration);

    }, []);


    return <AuthContext.Provider value={{loggedIn, login, logout}}>
        {children}
    </AuthContext.Provider>
}