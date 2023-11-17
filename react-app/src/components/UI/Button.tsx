import React from "react";
import styles from "./Button.module.css";
import { Color } from "../../constants/colorPalette";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{

  children: React.ReactNode;
    className?: string;

}

const Button: React.FC<ButtonProps> = ({


  children,
  className, ...otherProps
}) => {
  return (
    <button
        {...otherProps}
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
