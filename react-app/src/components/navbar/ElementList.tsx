
import navStyles from "./Navbar.module.css";
import sideStyles from "./Sidebar.module.css";
import {Elements} from "./types";
import {Link} from "react-router-dom";
import React from "react";

interface ElementListProps {
    elements: Elements;
    sidebar: boolean;
}

const ElementList: React.FC<ElementListProps> = ({elements, sidebar}) => {
    const styles = sidebar ? sideStyles : navStyles;
    return  (

        <ul>
            {
                elements.map((element, index) => {
                    console.log({element});
                    if (element.onClick !== undefined) {
                        console.log("element.onClick")
                        return (
                            <li key={index} onClick={element.onClick} style={{
                                alignItems: "center",
                                gap: "1.5rem"
                            }}>
                                <label>{element.name}</label>
                                {element.icon}
                            </li>
                        )
                    } else {
                        return (
                            <li key={index}>
                                <Link className={styles.link} to={element.path}>
                                    <label>{element.name}</label>
                                    {element.icon}
                                </Link>
                            </li>
                        )
                    }

                })
            }
        </ul>


    )
}

export default ElementList;