import {Navigate} from "react-router-dom";
import React, {FC, useContext} from "react";
import {AuthContext} from "../store/AuthContext";
import {ROUTES} from "../constants/constants";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({children}) => {
    const { loggedIn } = useContext(AuthContext);
    if(loggedIn){
        return <>{children}</>
    }else{
        return <Navigate to={ROUTES.AUTH("OTHER_PAGE")} />
    }
}


export default ProtectedRoute;