import styles from "./Sidebar.module.css";
import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import {animated, useSpring} from "@react-spring/web";
import {Elements} from "./types";

import ElementList from "./ElementList";
interface SidebarProps {
    onClose: () => void;
    elements: Elements;
}

const Sidebar: React.FC<SidebarProps> = ({onClose, elements}) => {

    const props = useSpring({
        from: { transform: 'translateX(-100%)' },
        to: { transform: 'translateX(0%)' },
    });

    return (
        <animated.aside className={styles.sidebar} style={props}>
            <AiOutlineClose onClick={onClose} className={styles.closeIcon}/>
            <ElementList elements={elements} onSelected={onClose} sidebar/>
        </animated.aside>
    )
}

export default Sidebar;