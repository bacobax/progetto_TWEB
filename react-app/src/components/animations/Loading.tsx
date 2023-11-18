import React from "react";
import loadingAnimation from "../../assets/animations/loading.json";

import Lottie from "lottie-react";

import styles from "./Loading.module.css";
import Card from "../UI/Card";

interface LoadingProps {

}

const Loading: React.FC<LoadingProps> = () => {
    return (
        <Card className={styles.container}>
            <Lottie animationData={loadingAnimation} className={styles.loading}/>
        </Card>
    );
}

export default Loading;