
import styles from "./NeuromorphismDiv.module.css";
import React from "react";
interface NeuromorphismDivProps extends React.HTMLAttributes<HTMLElement> {
    clickable: boolean;
}

const NeuromorphismDiv: React.FC<NeuromorphismDivProps> = ({children, className, clickable, ...props}) => {
    return (
        <div className={`${styles.container} ${clickable ? styles.clickable : ""} ${className}`}  {...props}>
            {children}
        </div>
    );
}

export default NeuromorphismDiv;
