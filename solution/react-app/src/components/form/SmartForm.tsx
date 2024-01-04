import styles from './SmartForm.module.css';
import React, {useCallback, useEffect, useState} from "react";
import {initialSignInState , initialSignUpState} from "../../constants/constants";
import AuthForm from "./AuthForm";
import {State} from "../../reducers/formReducer";
import {useAuth} from "../../hooks/useAuth";
import Loading from "../animations/Loading";
import Modal from "../UI/modal/Modal";
import useModal from "../../hooks/useModal";
import { motion} from "framer-motion";

import useWindowSize from "../../hooks/useWindowSize";
import {AuthError} from "../errors/AuthError";
import {useNavigate, useSearchParams} from "react-router-dom";
import {MyBreadcrumbs} from "../MyBreadcrumbs";

interface DualFormProps {

}

const AnimatedForm = motion(AuthForm);

const transitionForm=  {
    type: "spring",
    stiffness: 400,
    damping: 30,
}
const SmartForm: React.FC<DualFormProps> = () => {
    const [isSignin, setIsSignin] = useState(true)

    const {width} = useWindowSize();
    const {openModal, isModalOpen, closeModal} = useModal(false);
    const {loading,login,error,signup, setError} = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const redirectPath = searchParams.get("redirectPath") || "/";
    const navigate = useNavigate();

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
           login({email:email.value, password:password.value, afterSuccess: () => {
               if(searchParams.has("redirectPath")) {
                   navigate(-2);
               }else{
                   navigate(-1);
               }

           }});

        } else {
            const {name,surname, password, confirmPassword, email} = state;
            signup({
                name: name.value,
                surname: surname.value,
                password: password.value,
                confirmPassword: confirmPassword.value,
                email: email.value,
                afterSuccess: () => {
                    if(searchParams.has("redirectPath")) {
                        navigate(-2);
                    }else{
                        navigate(-1);
                    }
                }
            });

        }
    },[isSignin,login,signup,navigate,searchParams]);


    return (
        <div className={"w-4/5 h-[90%] bg-bg-dark flex flex-row rounded-medium hover:shadow-mycorvette"}>
            <MyBreadcrumbs breadcumbs={ [{label: "Home", href: "/"}, {label: "Sign In", href: "/auth"}]}/>
            <motion.div className={styles.image}
                animate={{
                    x: (width > 800) ? (isSignin ? "0%" : "100%") : "0%",
                    borderRadius : isSignin ? "10px 0px 0px 10px" : "0px 10px 10px 0px"
                }}
                transition={transitionForm}
                onClick={toggleForm}
            />
                <AnimatedForm
                    animate={{
                        x: (width > 800) ? (isSignin ? "0%" : "-100%") : "0%",
                    }}
                    transition={transitionForm}
                    isLogin={isSignin}
                    onSwitch={toggleForm}
                    loginState={initialSignInState}
                    signupState={initialSignUpState} onSubmit={onSubmitHandler}
                />

            {loading && <Loading />}
            {error && <AuthError opened={isModalOpen} onClose={()=>{
                setError(null);
                closeModal();
            }} message={error}/> }
        </div>
    );
}

export default SmartForm;