import { BASE_URL } from "../constants/constants";

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
export const login: loginFN = (token, name, email, _id) => {

    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("_id", _id);
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("_id");
}


export const getToken = () => {

    //verify if token is valid and not expired

    const token = localStorage.getItem("token");

    if(token === null || token.trim().length <= 0) return null;

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