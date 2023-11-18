import {Elements} from "../components/navbar/types";

import { IoHomeOutline } from "react-icons/io5";
import { FaRegNewspaper } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";

import styles from "../components/navbar/Navbar.module.css";
export const navbarElements: Elements = [
    {
       name: "Home",
        path: "/",
        icon: <IoHomeOutline className={styles.icon} />

    },
    {
        name: "About",
        path: "/about",
        icon: <IoMdInformationCircleOutline className={styles.icon}/>
    },
    {
        name: "News",
        path: "/news",
        icon: <FaRegNewspaper  className={styles.icon}/>
    }];