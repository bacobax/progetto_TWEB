import styles from './SmartForm.module.css';
import React, {useState} from "react";

import Form from "./Form";
import {State} from "../../reducers/formReducer";
interface DualFormProps {

}

const passwordRegexValidation = (value: string):boolean => {
    return value.length >= 6 && value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/) !== null
}

const initialSignInState = {
    username: {
        value: "",
        error: false,
        errorText: "username must be at least 6 characters long",
        validate: (value: string) => {
            return value.length >= 6;
        },
    },
    password: {
        value: "",
        error: false,
        errorText: "password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character",
        validate: passwordRegexValidation
    }
}
const initialSignUpState = {
    username: {
        value: "",
        error: false,
        errorText: "username must be at least 6 characters long",
        validate: (value: string) => {
            return value.length >= 6;
        },
    },
    password: {
        value: "",
        error: false,
        errorText: "password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character",
        validate: passwordRegexValidation
    },
    confirmPassword: {
        value: "",
        error: false,
        errorText: "password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character",
        validate: passwordRegexValidation
    },
    email: {
        value: "",
        error: false,
        errorText: "email must be valid",
        validate: (value: string) => {
            return value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) !== null;
        }
    }
}

const SmartForm: React.FC<DualFormProps> = () => {
    const [isSignin, setIsSignin] = useState<boolean>(true)
    const toggleForm = () => {
        setIsSignin(prev => !prev);
    }

    const onSubmitHandler = (state: State) => {
        if(isSignin) {
            console.log("signin", state);
            //TODO: dovrò fetchare qualche dato
        } else {
            console.log("signup", state);
            //TODO: dovrò fetchare qualche dato
        }
    }

    return (
        <div className={styles.container} style={{
            flexDirection: (isSignin? "row-reverse" : "row")
        }}>
            <div className={styles.image} />

            <Form isLogin={isSignin} onSwitch={toggleForm} loginState={initialSignInState} signupState={initialSignUpState} onSubmit={onSubmitHandler}/>

        </div>
    );
}

export default SmartForm;