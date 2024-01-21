import React from "react";
import loadingAnimation from "../../assets/animations/loading.json";

import Lottie from "lottie-react";

import styles from "./Loading.module.css";
import Card from "../UI/Card";

interface LoadingProps {

}

/**
 * Loading is a functional component in React.
 * It returns a Card component with a Lottie animation inside.
 *
 * The Card component is a UI component defined in the application. It is styled with a CSS module.
 * The Lottie component is a third-party component that renders animations based on JSON data.
 * The animationData prop of the Lottie component is set to the loadingAnimation imported from the assets.
 *
 * The Loading component does not accept any props.
 */
const Loading: React.FC<LoadingProps> = () => {
    return (
        <Card className={styles.container}>
            <Lottie animationData={loadingAnimation} className={styles.loading}/>
        </Card>
    );
}
export default Loading;