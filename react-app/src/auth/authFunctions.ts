import { BASE_URL } from "../constants/constants";

//jwt authentication handling

export const SIGNUP_URL = `${BASE_URL}/users/signup`;
export const LOGIN_URL = `${BASE_URL}/users/login`;

export type Status = "success" | "fail" | "error";
export interface SignUpData {
    name: string;
    surname: string;
    email: string;
    role: string;
    password: string;
    _id?: string;
    "__v"?: number;
}

export interface SignUpResponse {
    status: Status;
    token: string;
    data: {
        user: SignUpData;
    },
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

export type loginFN = (token:string, email: string, password: string) => void;
export const login: loginFN = (token, name, email) => {

    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
}


export const getToken = () => {

    //verify if token is valid and not expired

    const token = localStorage.getItem("token");

    if(token === null || token.trim().length <= 0) return null;

};
