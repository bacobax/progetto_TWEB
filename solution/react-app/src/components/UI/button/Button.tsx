import React, {FC, forwardRef} from "react";
import styles from "./Button.module.css";
import {motion, MotionProps} from "framer-motion";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  animated?: false;
}

interface AnimatedButtonProps extends MotionProps{
    animated: true;
    className?: string;
    onClick?: () => void;
}


export type Props = AnimatedButtonProps | ButtonProps;

const isAnimatedButtonProps = (props: Props): props is AnimatedButtonProps => {
    return props.animated !== undefined && props.animated;
}

/**
 * Button is a functional component in React.
 * It accepts props of type Props which includes:
 * - animated: A boolean indicating whether the button is animated.
 * - className: A string representing the CSS classes to be applied to the button.
 * - onClick: A function to be executed when the button is clicked.
 * - children: The child elements to be rendered within the button.
 * - whileHover, variants: The props for the motion.button component from the framer-motion library. These props are only used when the animated prop is true.
 * - otherProps: Any additional props are collected into this object and passed to the button or motion.button component.
 *
 * The component uses the isAnimatedButtonProps function to determine whether the animated prop is true.
 *
 * If the animated prop is true, the component returns a motion.button component from the framer-motion library. The motion.button is styled with CSS classes and includes the whileHover and variants props for the animation. The otherProps are spread onto the motion.button component. The children prop is passed as the children of the motion.button component.
 *
 * If the animated prop is not true, the component returns a button element. The button is styled with CSS classes. The otherProps are spread onto the button element. The children prop is passed as the children of the button element.
 */
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
