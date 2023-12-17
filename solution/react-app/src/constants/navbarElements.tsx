import {Elements, NavbarElement} from "../components/navbar/types";

import { IoHomeOutline } from "react-icons/io5";
import { FaRegNewspaper } from "react-icons/fa";
import {IoIosLogIn, IoIosLogOut, IoMdInformationCircleOutline} from "react-icons/io";
import { BsChatQuote } from "react-icons/bs";

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

export const logoutElement = (onClick: ()=>void) => ({
    name: "Logout",
    path: "/",
    icon: <IoIosLogOut className={styles.icon}/>,
    onClick: onClick,
    routerLink: false
})

export const chatElement: NavbarElement = {
    name: "Chat",
    path: "/chat",
    icon: <BsChatQuote className={styles.icon}/>,
    routerLink: true

}

export const loginElement: NavbarElement = {
    name: "Login",
    path: "/auth",
    icon: <IoIosLogIn className={styles.icon}/>,
    routerLink: true
}