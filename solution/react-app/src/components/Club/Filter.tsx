import React from "react";

import styles from "./Filter.module.css";
import { IoMdClose } from "react-icons/io";

interface FilterProps {
    name: string;
    onClose: ()=>void;
}

/**
 * Filter is a functional component in React.
 * It accepts props of type FilterProps which includes:
 * - name: A string representing the name of the filter.
 * - onClose: A function to be executed when the close icon is clicked.
 *
 * The component returns a div element styled with CSS classes from the Filter.module.css file. The div includes:
 * - A span element displaying the name of the filter.
 * - An IoMdClose icon from the react-icons library. The icon is styled with CSS classes from the Filter.module.css file. The onClick prop is attached to the icon, triggering the onClose prop when the icon is clicked.
 */
const Filter:React.FC<FilterProps> = ({name, onClose}) => {
    return (
        <div className={styles.container}>
            <span>{name}</span>
            <IoMdClose onClick={onClose} className={styles.icon}/>
        </div>
    )
};
export default Filter;