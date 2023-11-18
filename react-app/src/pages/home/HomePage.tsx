
import styles from "./HomePage.module.css";

import {useRef} from "react";

import fieldAnimation from "../../assets/animations/campoCalcio.json";
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import Navbar from "../../components/navbar/Navbar";
import {navbarElements} from "../../constants/navbarElements";
import Button from "../../components/UI/button/Button";
import {Link} from "react-router-dom";
function HomePage() {
    const footballRef = useRef<LottieRefCurrentProps>(null);
    return (
        <>

            <Navbar onSearch={(t)=>{alert(t)}} elements={navbarElements}/>
            <main className={styles.home + " bg-color"}>
                <Lottie onComplete={()=>{
                    footballRef.current?.goToAndPlay(20,true)
                }} animationData={fieldAnimation} className={styles.animatedFootball} lottieRef={footballRef} loop={false}/>
                <div className={styles.auth}>
                    <Button><Link style={{all:"unset"}} to={"/auth"}>Get Started</Link>  </Button>

                </div>
            </main>
        </>
    );
}

export default HomePage;
