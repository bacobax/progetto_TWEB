import styles from "./InputGroup.module.css";

import React, {forwardRef} from "react";


interface InputGroupProps {
    name: string;
    inputProps: React.InputHTMLAttributes<HTMLInputElement>;
    className?: string;

    error?: [boolean, string];
}

const InputGroup = forwardRef<HTMLDivElement,InputGroupProps>(({name, inputProps, className,error},ref) => {

    return (
        <div className={`${styles.inputgroup} ${className} ${(error && error[0]) ? styles.error : ""}` }>
            <label>{name}</label>
            {error && error[0] && <p>{error[1]}</p>}
            <input  {...inputProps} />
        </div>
    )
})

export default InputGroup;