import styles from './SmartForm.module.css';
import React, {useCallback, useEffect, useState} from "react";
import {initialSignInState, initialSignUpState} from "./defaultStates";

import Form from "./Form";
import {State} from "../../hooks/formReducer";
import useWindowSize from "../../hooks/useWindowSize";
import useFetch from "../../hooks/useFetch";
import {useAuth} from "../../hooks/useAuth";
import Loading from "../animations/Loading";
import Modal from "../UI/modal/Modal";
import useModal from "../../hooks/useModal";

interface DualFormProps {

}

const SmartForm: React.FC<DualFormProps> = () => {
    const [isSignin, setIsSignin] = useState<boolean>(true)
    const {width} = useWindowSize();
    const {openModal, isModalOpen, closeModal} = useModal(false);
    const {loading,login,error,signup, setError} = useAuth()

    const toggleForm = useCallback (() => {
        setIsSignin(prev => !prev);
    },[])

    useEffect(() => {
        if(error) {
            openModal();
        }
    }, [error, openModal]);

    const onSubmitHandler = useCallback ((state: State) => {
        if(isSignin) {

            const {email,password} = state;
           login(email.value, password.value);

        } else {
            const {name,surname, password, confirmPassword, email} = state;
            signup(name.value, surname.value, password.value, confirmPassword.value, email.value);

        }
    },[isSignin,login,signup]);


    return (
        <div className={`${styles.container} ${styles.row}`}>
            <div className={styles.image} style={{
                transform : (width > 800) ?`translateX(${isSignin ? "0" : "+100%"})` : "",
                borderRadius : isSignin ? "10px 0px 0px 10px" : "0px 10px 10px 0px"
            }}/>
            <Form style={{
                transform : (width > 800) ? `translateX(${isSignin ? "0" : "-100%"})` : ""
            }} isLogin={isSignin} onSwitch={toggleForm} loginState={initialSignInState} signupState={initialSignUpState} onSubmit={onSubmitHandler}/>
            {loading && <Loading />}
            {error && <Modal onClose={()=>{
                setError(null);
                closeModal()
            }
            } title={error} opened={isModalOpen}>
                <h1>Error: {error}</h1>
            </Modal> }
        </div>
    );
}

export default SmartForm;