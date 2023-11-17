import styles from "./SingleForm.module.css";


import React, {useState} from "react";
import InputGroup from "../UI/Input/InputGroup";
import Button from "../UI/Button";

interface SignUpProps {
    onSwitch: () => void;
}
const SignUp: React.FC<SignUpProps> = ({onSwitch}) => {
    return (
        <div className={styles.container}>
            <h1>SignUp</h1>
            <form className={styles.form}>
                <InputGroup className={styles.group} name={"Username"} inputProps={{
                    type: "text"
                }} />
                <InputGroup className={styles.group} name={"Email"} inputProps={{
                    type: "text"
                }} />
                <InputGroup className={styles.group} name={"Password"} inputProps={{
                    type: "password"
                }} />
                <InputGroup className={styles.group} name={"Repeat Password"} inputProps={{
                    type: "password"
                }} />
                <div className={styles.controls}>
                    <Button className={styles['submit-btn']} type="submit">
                        Submit
                    </Button>
                    <Button className={styles['switch-form-btn']} onClick={onSwitch}>
                        Sign In
                    </Button>
                </div>
            </form>
        </div>

    )
}

export default SignUp;