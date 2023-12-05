import styles from "./Sidebar.module.css";
import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import {motion} from "framer-motion";
import {Elements} from "./types";

import ElementList from "./ElementList";
interface SidebarProps {
    onClose: () => void;
    elements: Elements;
}

const Sidebar: React.FC<SidebarProps> = ({onClose, elements}) => {


    return (
            <motion.aside className={styles.sidebar}
                          initial={{
                              x: "-100%",
                              opacity: 0
                          }}
                          animate={{
                              x: "0",
                              opacity: 1
                          }}
                          exit={{
                              x: "-100%"
                          }}
                          transition={{
                              duration: 0.2,
                              bounce: 0.2
                          }}
            >

                <AiOutlineClose onClick={onClose} className={styles.closeIcon}/>
                <ElementList elements={elements} onSelected={onClose} sidebar/>
            </motion.aside>


    )
}

export default Sidebar;