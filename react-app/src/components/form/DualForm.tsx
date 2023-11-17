import styles from './DualForm.module.css';
import React, {useState} from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
interface DualFormProps {

}
const DualForm: React.FC<DualFormProps> = () => {
    const [isSignin, setIsSignin] = useState<boolean>(true)
    const toggleForm = () => {
        setIsSignin(prev => !prev);
    }
    return (
        <div className={styles.container} style={{
            flexDirection: (isSignin? "row-reverse" : "row")
        }}>
            <div className={styles.image}>

            </div>

            {isSignin ? <SignIn onSwitch={toggleForm}/> : <SignUp onSwitch={toggleForm}/>}

        </div>
    );
}

export default DualForm;