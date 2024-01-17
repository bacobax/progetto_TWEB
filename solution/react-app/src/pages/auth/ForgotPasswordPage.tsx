import React, { FC, useState, FormEvent } from 'react';
import {Button, Input, Spinner} from "@nextui-org/react";
import useFetch from "../../hooks/useFetch";
import {URL_FORGOT_PASSWORD, URL_RESET_PASSWORD} from "../../constants/constants";

const ForgotPasswordPage: FC = () => {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [urlToReset, setUrlToReset] = useState('');
    const [successSentMessage, setSuccessSentMessage] = useState('');
    const [phase, setPhase] = useState(0);
    const {loading,fetchData,error,setError} = useFetch();
    const handleSubmit0 = (event: FormEvent) => {
        event.preventDefault();
        fetchData<{status: string, message:string}>({
            url: URL_FORGOT_PASSWORD,
            method: "POST",
            body: JSON.stringify({
                email
            }),
        }, res => {
            if(res.status === "success") {
                setSuccessSentMessage(res.message);
                setPhase(1);
            }
        })
    };

    const handleSubmit1 = (event: FormEvent) => {
        event.preventDefault();
        fetchData<{status: string, message:string}>({
            url: URL_RESET_PASSWORD(token),
            method: "POST",
            body: JSON.stringify({
                password,
                confirmPassword: passwordConfirm
            }),
        }, res => {
            if(res.status === "success") {
                setSuccessSentMessage("Succesfully restored password");
                setPhase(1);
            }
        })
    };

    const phaseSubmits = [
        handleSubmit0,
        handleSubmit1
    ]

    const phaseRendering = [
        <>
            <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                Email
            </label>
            <Input
                className="dark"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}

            />
        </>
        ,
        <>
            <label className="block text-white text-sm font-bold mb-2" htmlFor="token">
                Token
            </label>
            <Input
                className="dark"
                id="token"
                type="text"
                placeholder="Enter your token here"
                value={token}
                onChange={(e) => setToken(e.target.value)}
            />
            <Input
                className="dark"
                id="password"
                type="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Input
                className="dark"
                id="passwordConfirm"
                type="password"
                placeholder="Confirm your new password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
            />

        </>

    ]


    return (
        <div className="flex items-center flex-col gap-[100px] justify-center h-screen bg-transparent">
            <h1 className={"text-white text-5xl font-bold font-anonymousPro w-1/2 text-center"}>Oh no! Seems you forgot your password, no problem</h1>

            <div className="w-full max-w-xs rounded-medium" style={{
                backgroundColor: 'transparent',
                borderColor: '#B388FF',
                boxShadow: '0 0 25px #B388FF',
                color: 'white'
            }}>
                <form onSubmit={phaseSubmits[phase]} className="bg-transparent shadow-md rounded p-10 mb-4 flex flex-col gap-[20px]">

                        {loading ? <Spinner /> : phaseRendering[phase]}
                        {error && <p className="text-red-500 text-xs italic">{error}</p>}
                        {!!successSentMessage && <p className="text-green-500 text-xs italic">{successSentMessage}</p>}

                    <div className="flex items-center justify-between">
                        <Button
                            className=""
                            variant={"shadow"}
                            type="submit"
                            color={"secondary"}
                        >
                            Reset Password
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
