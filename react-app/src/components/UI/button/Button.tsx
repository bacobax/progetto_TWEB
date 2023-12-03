import React, {FC, forwardRef} from "react";
import styles from "./Button.module.css";
import {motion, MotionProps} from "framer-motion";


interface ButtonProps{

  children: React.ReactNode;
  className?: string;
  animated?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  whileHover?: MotionProps["whileHover"];
  variants?: MotionProps["variants"];
  whileTap?: MotionProps["whileTap"]

}

const Button : FC<ButtonProps> =({children, className, animated=false, whileHover,variants,...otherProps}) => {
  if(animated) {
    return (
        <motion.button {...otherProps} className={`${styles.button} ${className}`}
          whileHover={whileHover} variants={variants}
         transition={{
              type: "spring",
              stiffness: 400,
         }}
        >
          {children}
        </motion.button>
    )
  }
  return (
    <button {...otherProps} className={`${styles.button} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
