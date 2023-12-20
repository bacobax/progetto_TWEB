import {BASE_URL} from "../constants/constants";

//jwt authentication handling

export const SIGNUP_URL = `${BASE_URL}/api/users/signup`;
export const LOGIN_URL = `${BASE_URL}/api/users/login`;

export type Status = "success" | "fail" | "error";
export interface SignUpData {
    name: string;
    surname: string;
    email: string;
    role: string;
    password: string;
    _id: string;
    "__v"?: number;
}

export interface SignUpResponse {
    status: Status;
    token: string;

    user: SignUpData;

    message?: string;
}
export interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponse {
    status: Status;
    token: string;
    user: SignUpData;
    message?: string;
}

export type loginFN = (token:string, email: string, password: string, _id:string) => void;

export const getTokenDuration = () => {
    const now = new Date();
    const storedExpiration = (localStorage.getItem("expiration"));
    if(storedExpiration === null) return null;
    const expiration = new Date(storedExpiration);
    return expiration.getTime() - now.getTime();
}

export const login: loginFN = (token, name, email, _id) => {

    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("_id", _id);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 4);
    localStorage.setItem("expiration", expiration.toISOString());
}



export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("_id");
}

type Token = string;
export const getToken = ():null|Token|"EXPIRED" => {

    //verify if token is valid and not expired

    const token = localStorage.getItem("token");
    const expDuration = getTokenDuration();

    if(token === null || expDuration===null || token.trim().length <= 0) return null;

    if(expDuration <0){
        return "EXPIRED";
    }
    return token;


};

export const getUserInfo = () => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const _id = localStorage.getItem("_id");
    const token = localStorage.getItem("token");

    if(name === null || name.trim().length <= 0) return null;
    if(email === null || email.trim().length <= 0) return null;
    if(_id === null || _id.trim().length <= 0) return null;
    if(token === null || token.trim().length <= 0) return null;

    return {name, email, _id, token};
}