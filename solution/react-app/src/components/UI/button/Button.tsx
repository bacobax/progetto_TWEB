import React, {FC, forwardRef} from "react";
import styles from "./Button.module.css";
import {motion, MotionProps} from "framer-motion";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  animated?: false;
}

interface AnimatedButtonProps extends MotionProps{
    animated: true;
    className?: string;
}


export type Props = AnimatedButtonProps | ButtonProps;

const isAnimatedButtonProps = (props: Props): props is AnimatedButtonProps => {
    return props.animated !== undefined && props.animated;
}

const Button : FC<Props> =(props) => {


  if(isAnimatedButtonProps(props)) {
      const {className,children, whileHover,variants, ...otherProps} = props;
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
  }else{
      const {className, children, ...otherProps} = props;
      return (
          <button {...otherProps} className={`${styles.button} ${className}`}>
              {children}
          </button>
      );
  }

};

export default Button;
