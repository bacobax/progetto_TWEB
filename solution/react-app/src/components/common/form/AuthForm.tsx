

import React, {ChangeEvent, forwardRef, useCallback, useMemo} from "react";
import {useForm} from "../../../hooks/useForm";
import {State} from "../../../reducers/formReducer";
import {Button, Input} from "@nextui-org/react";

interface FormProps {
    onSwitch: () => void;
    isLogin: boolean;
    loginState: State;
    signupState: State;
    onSubmit: (state: State) => void;
    style?: React.CSSProperties;
}


const AuthForm = forwardRef<HTMLDivElement, FormProps>(({onSwitch, isLogin, loginState, signupState, onSubmit, style},ref) => {
    const {reset:resetSignUp, formState:formStateSignUp, handleInputChange: handleInputChangeSignUp, isValid: isValidSignUp} = useForm(signupState);
    const {reset: resetSignIn, formState: formStateSignIn,handleInputChange: handleInputChangeSignIn, isValid: isValidSignIn} = useForm(loginState);
    const reset = isLogin ? resetSignIn : resetSignUp;
    const formState = isLogin ? formStateSignIn : formStateSignUp;
    const handleInputChange = isLogin ? handleInputChangeSignIn : handleInputChangeSignUp;
    const isValid = isLogin ? isValidSignIn : isValidSignUp;

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        reset();
        onSubmit(formState);
    },[formState, onSubmit, reset]);

    const inputs = useMemo(() => {
        return  Object.keys(formState).map((key) => {
            const {value, error, errorText} = formState[key];
            const inputProps = {
                type: "text",
                value,
                onChange: (e:  ChangeEvent<HTMLInputElement>)=>{
                    handleInputChange({
                        inputName: key,
                        value: e.target.value
                    })
                }
            }
            return <Input key={key} label={key} className={"dark"} color={error?"danger":"success"} name={key}  isInvalid={error} errorMessage={error && errorText} variant={"bordered"} {...inputProps}/>
        })
    },[formState, handleInputChange]);



    return (
        <div className={"w-full md:w-1/2 h-full flex flex-col py-[30px] md:py-[70px] px-[20px] md:px-[50px] box-border gap-[30px] items-center justify-center text-white"} style={style} ref={ref}>
            <h1 className={"font-['Impact'] text-5xl text-corvette font-extrabold"}>{isLogin ? "Sign In" : "Sign Up"}</h1>
            <form className={"w-full flex flex-col py-0 px-[20px] gap-[40px] items-center justify-center"} onSubmit={handleSubmit}>
                    {
                        inputs
                    }

                <div className={"w-4/5 flex justify-around"}>
                    <Button type="submit" isDisabled={!isValid} color={"secondary"} className={"cursor-pointer dark"}>
                        Submit
                    </Button>
                    <Button  type="button" onClick={onSwitch} color={"default"} className={"dark"}>
                        {isLogin ?  "Sign-Up" : "Sign-In"}
                    </Button>
                </div>
            </form>
        </div>

    )
});

export default AuthForm;