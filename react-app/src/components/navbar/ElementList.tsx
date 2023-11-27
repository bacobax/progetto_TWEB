
import navStyles from "./Navbar.module.css";
import sideStyles from "./Sidebar.module.css";
import {Elements} from "./types";
import {Link} from "react-scroll";
import {Link as RouterLink} from "react-router-dom";
import React from "react";

interface ElementListProps {
    elements: Elements;
    sidebar: boolean;
    onSelected?: () => void;
}

const ElementList: React.FC<ElementListProps> = ({elements, sidebar, onSelected}) => {
    const styles = sidebar ? sideStyles : navStyles;
    return  (

        <ul>
            {
                elements.map((element, index) => {
                    if (element.onClick !== undefined) {
                        return (
                            <li key={index} onClick={()=>{
                                if (element.onClick !== undefined) element.onClick()
                                if (onSelected !== undefined) onSelected();

                            }} style={{
                                alignItems: "center",
                                gap: "1.5rem"
                            }}>
                                <label>{element.name}</label>
                                {element.icon}
                            </li>
                        )
                    } else {

                        return element.routerLink ? (
                            <li key={index} >
                                <RouterLink className={styles.link} to={element.path} >
                                    <label>{element.name}</label>
                                    {element.icon}
                                </RouterLink>
                            </li>
                        ) : (
                            <li key={index} onClick={onSelected ? onSelected : ()=>{}}>
                                <Link className={styles.link} to={element.path} smooth={true} duration={300} activeClass={styles.active} spy={true} onClick={onSelected ? onSelected : ()=>{}} offset={-100}>
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