import React, { useState, useCallback } from "react";
import styles from "./Navbar.module.css";
import SearchBar from "../searchbar/SearchBar";
import { RxHamburgerMenu } from "react-icons/rx";
import useWindowSize from "../../hooks/useWindowSize";
import Sidebar from "./Sidebar";
import {Elements} from "./types";
import {Link} from "react-router-dom";

interface NavbarProps {
  onSearch: (query: string) => void;
  elements: Elements;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, elements}) => {
    const [showSidebar, setShowSidebar] = useState(false);

  const {isPhone} = useWindowSize();
    const handleBurgerClick = useCallback(() => {
        setShowSidebar(prevState => !prevState);
    },[]);

    const handleCloseSidebar = useCallback(() => {
        setShowSidebar(false);
    },[]);

  return (
      <>
        <nav className={styles.navbar}>
          {!isPhone ? <ul>
              {
                    elements.map((element, index) => (
                        <li key={index}>
                            <Link className={styles.link} to={element.path}>
                                <label>{element.name}</label>
                                {element.icon}
                            </Link>
                        </li>
                    ))
              }
          </ul> : <RxHamburgerMenu className={styles.burgericon} onClick={handleBurgerClick}/>}
          <SearchBar onSearch={onSearch}/>
        </nav>
        {(isPhone && showSidebar) && <Sidebar onClose={handleCloseSidebar}/>}
      </>

  );
};

export default Navbar;
