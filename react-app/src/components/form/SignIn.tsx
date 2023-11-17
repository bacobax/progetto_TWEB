import styles from "./SingleForm.module.css";


import React, {useReducer} from "react";
import InputGroup from "../UI/Input/InputGroup";
import Button from "../UI/Button";
import {signInreducer, Actions} from "../../constants/reducers";

interface SignInProps {
    onSwitch: () => void;
}

const SignIn: React.FC<SignInProps> = ({onSwitch}) => {

    const [formState, dispatch] = useReducer(signInreducer , {
        username: "",
        password: ""
    })

    const inputChangeHandler = (action: Actions , value: string) => {
        dispatch({
            type: action,
            payload: value
        })
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({
            type: Actions.SUBMIT,
            payload: ""
        })
        console.log({formState});
    }

    return (
        <div className={styles.container}>
            <h1>SignIn</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <InputGroup className={styles.group} name={"Username"} inputProps={{
                    type: "text",
                    value: formState.username,
                    onChange: (e)=>{inputChangeHandler(Actions.UPDATE_USERNAME, e.target.value)}
                }} />
                <InputGroup className={styles.group} name={"Password"} inputProps={{
                    type: "password",
                    value: formState.password,
                    onChange: (e)=>{inputChangeHandler(Actions.UPDATE_PASSWORD, e.target.value)}
                }} />
                <div className={styles.controls}>
                    <Button className={styles['submit-btn']} type="submit">
                        Submit
                    </Button>
                    <Button className={styles['switch-form-btn']} onClick={onSwitch}>
                        Sign Up
                    </Button>
                </div>
            </form>
        </div>

    )
}

export default SignIn;