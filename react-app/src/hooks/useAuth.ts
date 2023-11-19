import useFetch from "./useFetch";
import {useCallback, useContext} from "react";
import {
    login as storageLogin,

    LOGIN_URL,
    LoginResponse,
    SIGNUP_URL,
    SignUpResponse
} from "../auth/authFunctions";
import {AuthContext} from "../store/AuthContext";

export const useAuth = () => {
    const {loading, error, fetchData,setError} = useFetch();
    const {login : ctxLogin, logout : ctxLogout, loggedIn } = useContext(AuthContext);

    const login = useCallback((email:string, password:string)=>{
        fetchData<LoginResponse>({
            url: LOGIN_URL,
            method: "POST",
            body: JSON.stringify({
                email:email,
                password:password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        } , (data) => {
            if(data.status === "fail"){
                setError(data.message ? data.message : "Error");
                return;
            }
            if(data.status === "success"){
                ctxLogin(data.token, data.user.name, data.user.email);
            }
            //TODO: da continuare
        });
    },[fetchData, setError, ctxLogin])

    const signup = useCallback((name: string, surname: string, password:string,confirmPassword:string,email:string)=>{
        fetchData<SignUpResponse>({
            url: SIGNUP_URL,
            method: "POST",
            body: JSON.stringify({
                name,
                surname,
                password,
                confirmPassword,
                email
            })
        }, (data) => {
            if(data.status === "fail" || data.status === "error"){
                setError(data.message ? data.message : "Error");
                return;
            }
            if(data.status === "success"){
                ctxLogin(data.token, data.data.user.name, data.data.user.email);
            }
            //TODO: da continuare
        });

        //TODO: dovrò fetchare qualche dato
    },[fetchData, setError, ctxLogin]);

    return {loading, error, login, signup, setError};

}