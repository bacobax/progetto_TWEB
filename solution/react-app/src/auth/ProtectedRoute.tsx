import {Navigate} from "react-router-dom";
import React, {FC, useContext} from "react";
import {AuthContext} from "../store/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({children}) => {
    const { loggedIn } = useContext(AuthContext);
    const currentPath = window.location.pathname;
    if(loggedIn){
        return <>{children}</>
    }else{
        return <Navigate to={`/auth?redirectPath=${currentPath}`} />
    }
}


export default ProtectedRoute;