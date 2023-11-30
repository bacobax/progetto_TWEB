import React from "react";
import styles from "./IconButton.module.css";
import Button from "./Button";
import {IconType} from "react-icons";

interface IconButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    Icon: IconType;
    text?: string;
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