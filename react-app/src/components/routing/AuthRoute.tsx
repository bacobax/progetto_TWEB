import React, {useContext} from "react";
import { Navigate} from "react-router-dom";
import {AuthContext} from "../../store/AuthContext";
interface Props {

    children: React.ReactNode;
}
const AuthRoute: React.FC<Props> = ({children}) => {

    const {loggedIn} = useContext(AuthContext);

    if(!loggedIn){
        return <Navigate to={"/auth"} replace={true} />
    }

    return <>{children}</>;

}

export default AuthRoute;