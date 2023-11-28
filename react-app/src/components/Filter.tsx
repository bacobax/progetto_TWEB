import React from "react";

import styles from "./Filter.module.css";
import { IoMdClose } from "react-icons/io";

interface FilterProps {
    name: string;
    onClose: ()=>void;
}

const Filter:React.FC<FilterProps> = ({name, onClose}) => {
    return (
        <div className={styles.container}>
            <span>{name}</span>
            <IoMdClose onClick={onClose} className={styles.icon}/>
        </div>
    )
};

export default Filter;