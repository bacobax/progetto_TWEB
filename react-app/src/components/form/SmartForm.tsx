import styles from './SmartForm.module.css';
import React, {useCallback, useState} from "react";
import {initialSignInState, initialSignUpState} from "./defaultStates";

import Form from "./Form";
import {State} from "../../hooks/formReducer";
interface DualFormProps {

}

const SmartForm: React.FC<DualFormProps> = () => {
    const [isSignin, setIsSignin] = useState<boolean>(true)


    const toggleForm = useCallback (() => {
        setIsSignin(prev => !prev);
    },[])

    const onSubmitHandler = useCallback ((state: State) => {
        if(isSignin) {
            console.log("signin", state);
            //TODO: dovrò fetchare qualche dato
        } else {
            console.log("signup", state);
            //TODO: dovrò fetchare qualche dato
        }
    },[isSignin]);


    return (
        <div className={`${styles.container} ${styles.row}`}>
            <div className={styles.image} style={{
                transform : `translateX(${isSignin ? "0" : "+100%"})`
            }}/>
            <Form style={{
                transform : `translateX(${isSignin ? "0" : "-100%"})`
            }} isLogin={isSignin} onSwitch={toggleForm} loginState={initialSignInState} signupState={initialSignUpState} onSubmit={onSubmitHandler}/>
        </div>
    );
}

export default SmartForm;