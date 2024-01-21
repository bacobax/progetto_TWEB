import styles from './SmartForm.module.css';
import React, {useCallback, useEffect} from "react";
import {initialSignInState , initialSignUpState} from "../../../constants/constants";
import AuthForm from "./AuthForm";
import {State} from "../../../reducers/formReducer";
import {useAuth} from "../../../hooks/useAuth";
import Loading from "../../animations/Loading";
import useModal from "../../../hooks/useModal";
import { motion} from "framer-motion";

import useWindowSize from "../../../hooks/useWindowSize";
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
/**
 * SmartForm is a functional component in React.
 * It does not accept any props.
 *
 * The component maintains several state variables:
 * - width: The width of the window, retrieved from the useWindowSize custom hook.
 * - openModal, isModalOpen, closeModal: The functions and state returned from the useModal custom hook.
 * - loading, login, error, signup, setError: The functions and state returned from the useAuth custom hook.
 * - searchParams, setSearchParams: The search parameters and setter function returned from the useSearchParams hook.
 * - mode: The mode of the form, retrieved from the search parameters.
 * - isSignin: A boolean indicating whether the form is in sign in mode.
 *
 * The component defines several callback functions:
 * - toggleForm: This function toggles the form mode between sign in and sign up.
 * - onSubmitHandler: This function handles the form submission. It calls the login or signup function from the useAuth hook based on the form mode.
 *
 * The component returns a div element with the following children:
 * - A MyBreadcrumbs component displaying the navigation path.
 * - An AnimatedForm component displaying the authentication form. The form mode, toggle function, and submit handler are passed as props to the AnimatedForm component.
 * - A Loading component displayed when the authentication process is loading.
 * - An AuthError component displayed when there is an authentication error.
 */
const SmartForm: React.FC<DualFormProps> = () => {

    const {width} = useWindowSize();
    const {openModal, isModalOpen, closeModal} = useModal(false);
    const {loading,login,error,signup, setError} = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const mode = searchParams.get("mode");
    const isSignin = mode === "IN";

    const navigate = useNavigate();

    const toggleForm = useCallback (() => {

            setSearchParams({mode: isSignin ? "UP" : "IN"});

    },[isSignin, setSearchParams]);

    useEffect(() => {
        if(error) {
            openModal();
        }
    }, [error, openModal]);

    const onSubmitHandler = useCallback ((state: State) => {
        if(isSignin) {
            const {email,password} = state;
           login({email:email.value, password:password.value, afterSuccess: () => {
               navigate("/");

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

                    navigate("/");

                }
            });

        }
    },[isSignin,login,signup,navigate]);


    return (
        <div className={"w-4/5 h-[90%] bg-bg-dark flex flex-row rounded-medium"}>
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