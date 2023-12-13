import styles from "./FakeSearchBar.module.css";
import {CiSearch} from "react-icons/ci";
import {isMacOs} from "../../utils/functions";
import React from "react";
import {Kbd} from "@nextui-org/react";
interface FakeSearchBarProps{
    onClick: () => void;
}

const FakeSearchBar: React.FC<FakeSearchBarProps> = ({onClick}) => {
    return (
        <div className={styles.searchbar} onClick={onClick}>
            <CiSearch className={styles["search-icon"]}/>
            <label className={styles.placeholder}>Search Everything...</label>
            <Kbd keys={["command"]} className="dark">K</Kbd>
        </div>
    )
}

export default  FakeSearchBar;