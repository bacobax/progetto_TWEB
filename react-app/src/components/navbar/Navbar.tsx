import React, { useState, useCallback } from "react";
import styles from "./Navbar.module.css";
import SearchBar from "../searchbar/SearchBar";
import { RxHamburgerMenu } from "react-icons/rx";
import useWindowSize from "../../hooks/useWindowSize";
import Sidebar from "./Sidebar";

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
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
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul> : <RxHamburgerMenu className={styles.burgericon} onClick={handleBurgerClick}/>}
          <SearchBar onSearch={onSearch}/>
        </nav>
        {(isPhone && showSidebar) && <Sidebar onClose={handleCloseSidebar}/>}
      </>

  );
};

export default Navbar;
