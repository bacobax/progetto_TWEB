import React, {useContext, useState} from "react";
import styles from "./Navbar.module.css";
import SearchBar from "../searchbar/SearchBar";
import { RxHamburgerMenu } from "react-icons/rx";
import Sidebar from "./Sidebar";
import {Elements} from "./types";
import {AuthContext} from "../../store/AuthContext";
import {useAuth} from "../../hooks/useAuth";
import ElementList from "./ElementList";
import {loginElement, logoutElement} from "../../constants/navbarElements";
import {AnimatePresence} from "framer-motion";

import useWindowSize from "../../hooks/useWindowSize";


interface NavbarProps {
  elements: Elements;
}

const Navbar: React.FC<NavbarProps> = ({elements}) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const {loggedIn} = useContext(AuthContext);
  const {logout} = useAuth();
  const {isPhone} = useWindowSize();

  const elementsFinal: Elements= loggedIn ? [...elements , logoutElement] : [...elements , loginElement];
    const handleBurgerClick = () => {
        setShowSidebar(prev => !prev)
    }
    const handleCloseSidebar = () => {
        setShowSidebar(false);
    }
  return (
      <>
        <nav className={styles.navbar}>

          {!isPhone ? <ElementList sidebar={false} elements={elementsFinal} /> : <RxHamburgerMenu className={styles.burgericon} onClick={handleBurgerClick}/>}
          <SearchBar/>
        </nav>
        <AnimatePresence>
            {(isPhone && showSidebar) && <Sidebar onClose={handleCloseSidebar} elements={elementsFinal}/>}
        </AnimatePresence>


      </>

  );
};

export default Navbar;
