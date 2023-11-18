import styles from "./Sidebar.module.css";
import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import {animated, useSpring} from "@react-spring/web";
interface SidebarProps {
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({onClose}) => {

    const props = useSpring({
        from: { transform: 'translateX(-100%)' },
        to: { transform: 'translateX(0%)' },
    });




    return (
        <animated.aside className={styles.sidebar} style={props}>
            <AiOutlineClose onClick={onClose} className={styles.closeIcon}/>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </animated.aside>
    )
}

export default Sidebar;