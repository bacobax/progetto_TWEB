import useFetch from "./useFetch";
import {useCallback, useContext} from "react";
import {
    LOGIN_URL,
    LoginResponse,
    SIGNUP_URL,
    SignUpResponse
} from "../auth/authFunctions";
import {AuthContext} from "../store/AuthContext";
import {useNavigate} from "react-router-dom";

interface LoginParams{
    email: string;
    password: string;
    redirectPath: string;
}

interface SignUpParams{
    name: string;
    surname: string;
    password: string;
    confirmPassword: string;
    email: string;
    redirectPath: string;
}

type loginFn = ({email, password}: LoginParams) => void;

type signupFn = (params: SignUpParams) => void;

export const useAuth = () => {
    const navigate = useNavigate();
    const {loading, error, fetchData,setError} = useFetch();
    const {login : ctxLogin, logout : ctxLogout, loggedIn } = useContext(AuthContext);


    const login: loginFn = useCallback(({email, password, redirectPath})=>{
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
                navigate(redirectPath)
            }

        });
    },[fetchData, setError, ctxLogin, navigate])

    const signup: signupFn = useCallback(({name, surname, password, confirmPassword, email, redirectPath})=>{
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
                navigate(redirectPath);
            }
            //TODO: da continuare
        });


    },[fetchData, setError, ctxLogin, navigate]);

    const logout = useCallback(()=>{
        ctxLogout();

    } , [ctxLogout]);

    return {loading, error, login, signup, setError, logout};

}