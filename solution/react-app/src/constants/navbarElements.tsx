import {Elements, NavbarElement} from "../components/navbar/types";

import { IoHomeOutline } from "react-icons/io5";
import { FaRegNewspaper } from "react-icons/fa";
import {IoIosLogIn, IoIosLogOut, IoMdInformationCircleOutline} from "react-icons/io";
import {HOME_SECTIONS as s} from "./constants";

import styles from "../components/navbar/Navbar.module.css";
import React from "react";
import {logout} from "../auth/authFunctions";
export const navbarElements: Elements = [
    {
       name: s.HOME.linkLabel,
        path: s.HOME.name,
        icon: <IoHomeOutline className={styles.icon} />,
        routerLink: false


    },
    {
        name: s.PLAYERS.linkLabel,
        path: s.PLAYERS.name,
        icon: <IoMdInformationCircleOutline className={styles.icon}/>,
        routerLink: false
    },
    {
        name: s.TEAMS.linkLabel,
        path: s.TEAMS.name,
        icon: <FaRegNewspaper  className={styles.icon}/>,
        routerLink: false
    },


];

export const logoutElement: NavbarElement = {
    name: "Logout",
    path: "/",
    icon: <IoIosLogOut className={styles.icon}/>,
    onClick: () => {
        console.log("logout")
        logout();
    },
    routerLink: false
}

export const loginElement: NavbarElement = {
    name: "Login",
    path: "/auth",
    icon: <IoIosLogIn className={styles.icon}/>,
    routerLink: true
}