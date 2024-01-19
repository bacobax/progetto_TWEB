import React from "react";
import styles from "./FancyHeader.module.css";
interface FancyHeaderProps {
    title: string;
}
const FancyHeader: React.FC<FancyHeaderProps> = ({title}) => {
    return (
        <header className={styles.header}>
        <h1 className={"font-sansDM"}>{title}</h1>
        </header>
    );

}

export default FancyHeader;