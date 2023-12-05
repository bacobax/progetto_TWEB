import React, { useState, useCallback, useContext } from "react";
import styles from "./Navbar.module.css";
import SearchBar from "../searchbar/SearchBar";
import { RxHamburgerMenu } from "react-icons/rx";
import useWindowSize from "../../hooks/useWindowSize";
import Sidebar from "./Sidebar";
import {Elements} from "./types";
import {AuthContext} from "../../store/AuthContext";
import {useAuth} from "../../hooks/useAuth";
import ElementList from "./ElementList";
import {loginElement, logoutElement} from "../../constants/navbarElements";
import {AnimatePresence} from "framer-motion";

interface NavbarProps {
  onSearch: (query: string) => void;
  elements: Elements;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, elements}) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const {loggedIn} = useContext(AuthContext);
  const {logout} = useAuth();
  const {isPhone} = useWindowSize();
    const handleBurgerClick = useCallback(() => {
        setShowSidebar(prevState => !prevState);
    },[]);

    const handleCloseSidebar = useCallback(() => {
        setShowSidebar(false);
    },[]);

    const elementsFinal: Elements= loggedIn ? [...elements , logoutElement] : [...elements , loginElement];



  return (
      <>
        <nav className={styles.navbar}>

          {!isPhone ? <ElementList sidebar={false} elements={elementsFinal} /> : <RxHamburgerMenu className={styles.burgericon} onClick={handleBurgerClick}/>}
          <SearchBar onSearch={onSearch}/>
        </nav>
        <AnimatePresence>
            {(isPhone && showSidebar) && <Sidebar onClose={handleCloseSidebar} elements={elementsFinal}/>}
        </AnimatePresence>


      </>

  );
};

export default Navbar;
