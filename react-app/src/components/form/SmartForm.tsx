import styles from './SmartForm.module.css';
import React, {useCallback, useEffect, useState} from "react";
import {initialSignInState , initialSignUpState} from "../../constants/constants";

import AuthForm from "./AuthForm";
import {State} from "../../reducers/formReducer";
import useWindowSize from "../../hooks/useWindowSize";
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
           login({email:email.value, password:password.value, redirectPath: "/"});

        } else {
            const {name,surname, password, confirmPassword, email} = state;
            signup({
                name: name.value,
                surname: surname.value,
                password: password.value,
                confirmPassword: confirmPassword.value,
                email: email.value,
                redirectPath: "/"
            });

        }
    },[isSignin,login,signup]);


    return (
        <div className={`${styles.container} ${styles.row}`}>
            <div className={styles.image} style={{
                transform : (width > 800) ?`translateX(${isSignin ? "0" : "+100%"})` : "",
                borderRadius : isSignin ? "10px 0px 0px 10px" : "0px 10px 10px 0px"
            }}/>
            <AuthForm style={{transform : (width > 800) ? `translateX(${isSignin ? "0" : "-100%"})` : ""}}
                      isLogin={isSignin}
                      onSwitch={toggleForm}
                      loginState={initialSignInState}
                      signupState={initialSignUpState} onSubmit={onSubmitHandler}
            />
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