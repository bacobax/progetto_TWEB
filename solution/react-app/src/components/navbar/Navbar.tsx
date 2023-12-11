import React, { useState, useCallback, useContext } from "react";
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

import {signal} from "@preact/signals-react";
import signalWindowSize from "../../hooks/signalWindowSize";

const showSidebar = signal(false);
const handleBurgerClick = () => {
    showSidebar.value = !showSidebar.value;
}
const handleCloseSidebar = () => {
    showSidebar.value = false;
}
interface NavbarProps {
  onSearch: (query: string) => void;
  elements: Elements;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, elements}) => {
  //const [showSidebar, setShowSidebar] = useState(false);
  const {loggedIn} = useContext(AuthContext);
  const {logout} = useAuth();
  const isPhone = signalWindowSize.value.isPhone;

  const elementsFinal: Elements= loggedIn ? [...elements , logoutElement] : [...elements , loginElement];

  return (
      <>
        <nav className={styles.navbar}>

          {!isPhone ? <ElementList sidebar={false} elements={elementsFinal} /> : <RxHamburgerMenu className={styles.burgericon} onClick={handleBurgerClick}/>}
          <SearchBar onSearch={onSearch}/>
        </nav>
        <AnimatePresence>
            {(isPhone && showSidebar.value) && <Sidebar onClose={handleCloseSidebar} elements={elementsFinal}/>}
        </AnimatePresence>


      </>

  );
};

export default Navbar;
