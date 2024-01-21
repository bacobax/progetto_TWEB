import React from "react";
import styles from "./FoundedItem.module.css";
import { GiSoccerKick , GiDarkSquad} from "react-icons/gi";
import { MdOutlineMoreHoriz } from "react-icons/md";


interface FoundedItemProps{
    name: string;
    onClick: (id:number) => void;
    id: number;
    type: "player" | "team";
}

/**
 * FoundedItem is a functional component in React.
 * It accepts props of type FoundedItemProps which includes:
 * - name: A string representing the name of the item.
 * - onClick: A function to be executed when the item is clicked. The function takes the item's ID as a parameter.
 * - id: A number representing the ID of the item.
 * - type: A string representing the type of the item. It can be either "player" or "team".
 *
 * The component maintains a variable icon, which is a React element representing the icon for the item type.
 * The icon is determined based on the type prop using a switch statement. If the type is "player", a GiSoccerKick icon is used. If the type is "team", a GiDarkSquad icon is used. For any other type, a MdOutlineMoreHoriz icon is used.
 *
 * The component returns a li element styled with CSS classes from the FoundedItem.module.css file. The li includes:
 * - The icon for the item type.
 * - A p element displaying the name of the item.
 *
 * The onClick prop is attached to the li, triggering the provided function with the item's ID when the item is clicked.
 */
const FoundedItem: React.FC<FoundedItemProps> = ({name, onClick, id, type}) => {
    let icon;
    switch (type) {
        case "player":
            icon = <GiSoccerKick className={styles.icon} />
            break;
        case "team":
            icon = <GiDarkSquad className={styles.icon} />
            break;
        default:
            icon = <MdOutlineMoreHoriz className={styles.icon} />
            break;
    }

    return (
        <li className={styles.item} onClick={()=>{onClick(id)}} >
            {icon} <p>{name}</p>
        </li>
    )
}

export default FoundedItem;