import React, { FC, useState, FormEvent } from 'react';
import {Button, CircularProgress, Input, Spinner} from "@nextui-org/react";
import useFetch from "../../hooks/useFetch";
import {passwordRegexValidation, URL_FORGOT_PASSWORD, URL_RESET_PASSWORD} from "../../constants/constants";
import NeuromorphismDiv from "../../components/UI/NeuromorphismDiv";
import {login} from "../../auth/authFunctions";
import {useAuth} from "../../hooks/useAuth";
import {useForm} from "../../hooks/useForm";

const ForgotPasswordPage: FC = () => {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [successSentMessage, setSuccessSentMessage] = useState('');
    const [phase, setPhase] = useState(0);
    const {loading,fetchData,error,setError} = useFetch();


    const {formState, handleInputChange, reset  , isValid} = useForm({
        password : {
            value: "",
            error: false,
            errorText: "Password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter",
            validate: passwordRegexValidation
        },
        confirmPassword : {
            value: "",
            error: false,
            errorText: "Password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter",
            validate: passwordRegexValidation
        }
    })

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
                setError("");
            }else{
                console.log({res})
                setError(res.message)
            }
        })
    };

    const handleSubmit1 = (event: FormEvent) => {
        event.preventDefault();
        fetchData<{status: string, message:string, token:string}>({
            url: URL_RESET_PASSWORD(token),
            method: "POST",
            body: JSON.stringify({
                password: formState.password.value,
                confirmPassword: formState.confirmPassword.value
            }),
        }, res => {
            console.log({res})
            if(res.status === "success") {
                setSuccessSentMessage("Succesfully restored password");
                setPhase(1);
                setError("");
            }else{
                console.log({res})
                setError(res.message)
            }
        })
    };

    const phaseSubmits = [
        handleSubmit0,
        handleSubmit1
    ]

    const emailValid = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) !== null;

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
                autoFocus={true}
                isInvalid={!emailValid}
                errorMessage={!emailValid && "Please enter a valid email"}
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
                type="password"
                placeholder="Enter your token here"
                value={token}
                onChange={(e) => setToken(e.target.value)}
            />
            <Input
                className="dark"
                id="password"
                type="password"
                placeholder="Enter your new password"
                value={formState.password.value}
                onChange={(e) => {
                    handleInputChange({inputName: "password", value: e.target.value})
                }}
                isInvalid={formState.password.error}
                errorMessage={formState.password.error && formState.password.errorText}
            />
            <Input
                className="dark"
                id="passwordConfirm"
                type="password"
                placeholder="Confirm your new password"
                value={formState.confirmPassword.value}
                onChange={(e) => {
                    handleInputChange({inputName: "confirmPassword", value: e.target.value})
                }}
                isInvalid={formState.confirmPassword.error}
                errorMessage={formState.confirmPassword.error && formState.confirmPassword.errorText}
            />

        </>

    ]

    console.log({error})


    return (
        <div className="flex items-center flex-col gap-[100px] justify-center h-screen bg-transparent">
            <h1 className={"text-white text-5xl font-bold font-sansDM w-1/2 text-center"}>Password recovery</h1>

            <NeuromorphismDiv clickable={false} className="w-full max-w-xs rounded-medium">
                <form onSubmit={phaseSubmits[phase]} className="bg-transparent shadow-md rounded p-10 mb-4 flex flex-col gap-[20px]">

                        {loading ? <Spinner /> : phaseRendering[phase]}
                        {!! error && <p className="text-red-500 text-xs italic">{error}</p>}
                        {!!successSentMessage && <p className="text-green-500 text-xs italic">{successSentMessage}</p>}

                    <div className="flex items-center justify-between">
                        <Button
                            className=""
                            variant={"shadow"}
                            type="submit"
                            color={"secondary"}
                            isDisabled={((phase === 0 && !emailValid)||(phase === 1 && (formState.password.error || formState.confirmPassword.error)))}
                        >
                            Reset Password
                        </Button>
                    </div>
                </form>
            </NeuromorphismDiv>
            <CircularProgress
                aria-label="Steps..."
                size="lg"
                value={(phase)*50}
                color="warning"
                showValueLabel={true}
            />
        </div>
    );
};

export default ForgotPasswordPage;
