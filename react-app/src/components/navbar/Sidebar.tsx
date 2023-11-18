import styles from "./Sidebar.module.css";
import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
interface SidebarProps {
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({onClose}) => {
    return (
        <aside className={styles.sidebar}>
            <AiOutlineClose onClick={onClose} className={styles.closeIcon}/>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </aside>
    )
}

export default Sidebar;