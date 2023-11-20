import React, { useState, useCallback, useContext } from "react";
import styles from "./Navbar.module.css";
import SearchBar from "../searchbar/SearchBar";
import { RxHamburgerMenu } from "react-icons/rx";
import useWindowSize from "../../hooks/useWindowSize";
import Sidebar from "./Sidebar";
import {Elements} from "./types";
import {Link} from "react-router-dom";
import {AuthContext} from "../../store/AuthContext";
import { IoIosLogOut, IoIosLogIn } from "react-icons/io";
import {useAuth} from "../../hooks/useAuth";
import ElementList from "./ElementList";

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

    const elementsFinal: Elements= loggedIn ? [...elements , {
        name: "Logout",
        path: "/",
        icon: <IoIosLogOut className={styles.icon}/>,
        onClick: () => {
            console.log("logout")
            logout();
        }
    }] : [...elements , {
        name: "Login",
        path: "/auth",
        icon: <IoIosLogIn className={styles.icon}/>,
    }];



  return (
      <>
        <nav className={styles.navbar}>
          {!isPhone ? <ElementList sidebar={false} elements={elementsFinal} /> : <RxHamburgerMenu className={styles.burgericon} onClick={handleBurgerClick}/>}
          <SearchBar onSearch={onSearch}/>
        </nav>
        {(isPhone && showSidebar) && <Sidebar onClose={handleCloseSidebar} elements={elementsFinal}/>}
      </>

  );
};

export default Navbar;
