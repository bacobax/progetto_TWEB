import React, {useRef} from 'react'
import Section from "../../../components/containers/Section";
import FancyHeader from "../../../components/FancyHeader";
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import fieldAnimation from "../../../assets/animations/home.json";
import styles from "./MainSection.module.css";
import Button from "../../../components/UI/button/Button";
import {motion} from "framer-motion";



interface MainSectionProps {
    name: string;
}

const MainSection: React.FC<MainSectionProps> = ({name}) => {
    const footballRef = useRef<LottieRefCurrentProps>(null);
    return (
        <Section name="home">
            <FancyHeader title={"Welcome to Football App"}/>
            <Lottie onComplete={()=>{
                footballRef.current?.goToAndPlay(20,true)
            }} animationData={fieldAnimation} className={styles.animatedFootball} lottieRef={footballRef} loop={true}/>
            <div className={styles.auth}>
                <Button animated
                    variants={{
                        hover: {
                            scale: 1.2,

                        }
                    }}
                    whileHover="hover"

                >Get Started </Button>
            </div>
        </Section>
    );

}

export default MainSection;