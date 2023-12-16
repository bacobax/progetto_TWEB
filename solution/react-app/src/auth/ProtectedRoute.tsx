import {Navigate} from "react-router-dom";
import React, {FC, useContext} from "react";
import {AuthContext} from "../store/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({children}) => {
    const { loggedIn } = useContext(AuthContext);
    if(loggedIn){
        return <>{children}</>
    }else{
        return <Navigate to={"/auth"} />
    }
}


export default ProtectedRoute;