import styles from "./InputGroup.module.css";

import React from "react";


interface InputGroupProps {
    name: string;
    inputProps: React.InputHTMLAttributes<HTMLInputElement>;
    className?: string;
    validation?: [(value: string) => boolean, string];
    error?: [boolean, string];
}

const InputGroup: React.FC<InputGroupProps> = ({name, inputProps, className,error}) => {

    return (
        <div className={`${styles.inputgroup} ${className} ${(error && error[0]) ? styles.error : ""}` }>
            <label>{name}</label>
            {error && error[0] && <p>{error[1]}</p>}
            <input  {...inputProps} />
        </div>
    )
}

export default InputGroup;