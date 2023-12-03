import React from "react";
import styles from "./IconButton.module.css";
import Button from "./Button";
import {IconType} from "react-icons";
import {MotionProps} from "framer-motion";

interface IconButtonProps {
    Icon: IconType;
    text?: string;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    whileHover?: MotionProps["whileHover"];
    variants?: MotionProps["variants"];
    animated?: boolean;
    whileTap?: MotionProps["whileTap"]

}

const IconButton: React.FC<IconButtonProps> = ({Icon,text,className, ...props}) => {
    return (
        <Button className={styles.iconButton + " " + className} {...props}>

            <>
                <Icon className={styles.icon}/>
                {text}
            </>

        </Button>
    )
}

export default IconButton;