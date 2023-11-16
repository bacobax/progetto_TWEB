import React, { useState } from "react";
import logo from "./logo.svg";
import styles from "./App.module.css";
import Modal from "./components/UI/Modal";
import useModal from "./hooks/useModal";
import Button from "./components/UI/Button";
import Navbar from "./components/navbar/Navbar";
import DropdownButton from "./components/UI/DropdownButton";
//random react-icons
import { FaBeer } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import PALETTE from "./constants/colorPalette";
import SearchBar from "./components/searchbar/SearchBar";
function App() {
  const { closeModal, isModalOpen, openModal } = useModal(true);
  return (
    <>
      <main className={styles.app + " bg-color"}>
        <SearchBar onSearch={ (query) => alert(query)}/>
      </main>
    </>
  );
}

export default App;
