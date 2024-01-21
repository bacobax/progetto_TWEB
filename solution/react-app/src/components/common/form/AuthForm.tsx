import React, { ChangeEvent, forwardRef, useCallback, useMemo } from "react";
import { useForm } from "../../../hooks/useForm";
import { State } from "../../../reducers/formReducer";
import { Button, Input } from "@nextui-org/react";
import {Link} from "react-router-dom";

interface FormProps {
    onSwitch: () => void;
    isLogin: boolean;
    loginState: State;
    signupState: State;
    onSubmit: (state: State) => void;
    style?: React.CSSProperties;
}

const inputTypes: { [key: string]: string } = {
    "email": "email",
    "password": "password",
    "confirmPassword": "password",
}

/**
 * AuthForm is a functional component in React that renders a form for user authentication.
 * It uses the forwardRef function to get a reference to the div element that wraps the form.
 *
 * @param {object} props - The properties passed to the component.
 * @param {function} props.onSwitch - A function to be executed when the user switches between the login and signup forms.
 * @param {boolean} props.isLogin - A boolean indicating whether the login form is displayed.
 * @param {object} props.loginState - The state of the login form.
 * @param {object} props.signupState - The state of the signup form.
 * @param {function} props.onSubmit - A function to be executed when the form is submitted.
 * @param {object} props.style - The CSS properties to be applied to the div element that wraps the form.
 * @param {object} ref - A reference to the div element that wraps the form.
 *
 * @returns {ReactElement} The rendered form.
 *
 * The component uses the useForm custom hook twice to manage the state of the login and signup forms.
 * It determines the current form state, input change handler, form reset function, and form validity based on the isLogin prop.
 *
 * The handleSubmit function is a callback that handles the form submission event. It prevents the default form submission behavior, resets the form, and calls the onSubmit prop with the current form state.
 *
 * The inputs constant is a memoized value that maps over the form state and creates an Input component for each form field.
 *
 * The component returns a div element that wraps a form. The form includes the Input components for the form fields, a submit button, a button for switching between the login and signup forms, and a link to the forgot password page.
 */
const AuthForm = forwardRef<HTMLDivElement, FormProps>(({ onSwitch, isLogin, loginState, signupState, onSubmit, style }, ref) => {
    const { reset: resetSignUp, formState: formStateSignUp, handleInputChange: handleInputChangeSignUp, isValid: isValidSignUp } = useForm(signupState);
    const { reset: resetSignIn, formState: formStateSignIn, handleInputChange: handleInputChangeSignIn, isValid: isValidSignIn } = useForm(loginState);
    const reset = isLogin ? resetSignIn : resetSignUp;
    const formState = isLogin ? formStateSignIn : formStateSignUp;
    const handleInputChange = isLogin ? handleInputChangeSignIn : handleInputChangeSignUp;
    const isValid = isLogin ? isValidSignIn : isValidSignUp;

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        reset();
        onSubmit(formState);
    }, [formState, onSubmit, reset]);

    const inputs = useMemo(() => {
        return Object.entries(formState).map(([key, { value, error, errorText }]) => (
            <div key={key} className={"w-full"}>
                <Input
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    className="dark"
                    color={error ? "danger" : "success"}
                    name={key}
                    isInvalid={error}
                    errorMessage={error && errorText}
                    variant="bordered"
                    type={inputTypes[key] || "text"}
                    value={value}
                    onChange={e => handleInputChange({ inputName: key, value: e.target.value })}
                    aria-label={`Enter your ${key}`}
                    aria-describedby={error ? `${key}-error` : undefined}
                />
            </div>
        ));
    }, [formState, handleInputChange]);

    return (
        <div className={"w-full md:w-1/2 h-full flex flex-col py-[30px] md:py-[70px] px-[20px] md:px-[50px] box-border gap-[30px] items-center justify-center text-white"} style={style} ref={ref}>
            <h1 className={"font-['Impact'] text-5xl text-corvette font-extrabold"}>{isLogin ? "Sign In" : "Sign Up"}</h1>
            <form className={"w-full flex flex-col py-0 gap-[40px] items-center justify-center"} onSubmit={handleSubmit} aria-labelledby="form-heading">
                {inputs}
                <div className={"w-4/5 flex justify-around"}>
                    <Button type="submit" isDisabled={!isValid} color={"secondary"} className={"cursor-pointer dark"} aria-label={isLogin ? "Submit Login" : "Submit Registration"}>
                        Submit
                    </Button>
                    <Button type="button" onClick={onSwitch} color={"default"} className={"dark"}>
                        {isLogin ? "Sign-Up" : "Sign-In"}
                    </Button>
                </div>
                <Link to={"/auth/forgot"} className={"underline text-primary-300"} >Forgot my password</Link>
            </form>
        </div>
    )
});
export default AuthForm;
