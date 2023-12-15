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