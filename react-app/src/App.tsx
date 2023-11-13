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
function App() {
  const { closeModal, isModalOpen, openModal } = useModal(true);
  return (
    <>
      <Navbar onSearch={(query) => console.log(query)} />
      <main className={styles.app + " bg-color"}>
        <h1 className="txt-primary">Hello World</h1>
        <Button
          onClick={openModal}
          txtColor={PALETTE.TXT.PRIMARY}
          accent={PALETTE.ACCENT.PRIMARY}
        >
          Open Modal
        </Button>
        <DropdownButton
          buttonText="bottome dropdown"
          onSelect={() => {
            console.log("ciao");
          }}
          accent={PALETTE.ACCENT.PRIMARY}
          txtColor={PALETTE.TXT.PRIMARY}
          options={[
            {
              label: "Option 1",
              icon: <FaBeer />,
            },
            {
              label: "Option 2",
              icon: <AiOutlineHome />,
            },
          ]}
          key={2}
        />
        <Modal
          onClose={closeModal}
          title="Modal title"
          className="bg-neutral"
          opened={isModalOpen}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus expedita laborum magnam sit voluptatum est illo velit
            amet dolore quis, unde molestiae! Est, accusantium veritatis
            inventore a hic ipsum unde.
          </p>
        </Modal>
      </main>
    </>
  );
}

export default App;
