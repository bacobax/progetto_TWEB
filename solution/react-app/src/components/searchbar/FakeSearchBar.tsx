import styles from "./FakeSearchBar.module.css";
import {CiSearch} from "react-icons/ci";
import {isMacOs} from "../../utils/functions";
import React from "react";
interface FakeSearchBarProps{
    onClick: () => void;
}

const FakeSearchBar: React.FC<FakeSearchBarProps> = ({onClick}) => {
    return (
        <div className={styles.searchbar} onClick={onClick}>
            <CiSearch className={styles["search-icon"]}/>
            <label className={styles.placeholder}>Search Everything...</label>
            <label className={styles.keys} >{isMacOs() ? "⌘+K" : "ctrl+K" }</label>
        </div>
    )
}

export default  FakeSearchBar;