import React, {forwardRef} from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{

  children: React.ReactNode;
    className?: string;

}

const Button =forwardRef<HTMLButtonElement, ButtonProps> (({


  children,
  className, ...otherProps
},ref) => {

  return (

    <button ref={ref}
        {...otherProps}
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  );
});

export default Button;
