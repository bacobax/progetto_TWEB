import React from "react";
import styles from "./IconButton.module.css";
import Button from "./Button";
import {IconType} from "react-icons";
import {Props as ButtonProps} from "./Button";

type IconButtonProps = ButtonProps & {
    Icon: IconType;
    text?: string;
}

const IconButton: React.FC<IconButtonProps> = ({Icon,text,className, ...props}) => {
    return (
        <Button className={styles.iconButton + " " + className} {...props}>
                <Icon className={styles.icon}/>
                {text}
        </Button>
    )
}

export default IconButton;