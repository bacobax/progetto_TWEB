import React, {useCallback, useRef} from 'react'
import Section from "../../../components/common/containers/Section";
import FancyHeader from "./FancyHeader";
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import fieldAnimation from "../../../assets/animations/home.json";
import styles from "./MainSection.module.css";
import Button from "../../../components/UI/button/Button";
import {animatedButtonProps} from "../../../constants/constants";


interface MainSectionProps {
    name: string;
}

/**
 * Renders the main section of the home page.
 * @returns The rendered main section of the home page.
 */
const MainSection: React.FC<MainSectionProps> = React.memo(({name}) => {
    const footballRef = useRef<LottieRefCurrentProps>(null);

    const handleComplete = useCallback(() => {
        footballRef.current?.goToAndPlay(20, true);
    }, []);

    return (
        <Section name={name}>
            <FancyHeader title={"Welcome to Goal Grapher"}/>
            <Lottie onComplete={handleComplete} animationData={fieldAnimation} className={styles.animatedFootball} lottieRef={footballRef} loop={true}/>
            <div className={styles.auth}>
                <Button
                    {...animatedButtonProps}
                >Get Started </Button>
            </div>
        </Section>
    );
});


export default MainSection;