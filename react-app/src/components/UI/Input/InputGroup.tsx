import styles from "./InputGroup.module.css";

import React from "react";


interface InputGroupProps {
    name: string;
    inputProps: React.InputHTMLAttributes<HTMLInputElement>;
    className?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({name, inputProps, className}) => {
    return (
        <div className={`${styles.inputgroup} ${className}` }>
            <label>{name}</label>
            <input  {...inputProps} />
        </div>
    )
}

export default InputGroup;