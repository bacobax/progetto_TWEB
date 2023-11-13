import React, { useState } from "react";
import styles from "./DropdownButton.module.css";
import Button from "./Button";
import { Color } from "../../constants/colorPalette";

interface Option {
  label: string;
  icon: React.ReactNode;
}

interface DropdownButtonProps {
  buttonText: string;
  options: Option[];
  onSelect: (selectedOption: string) => void;
  accent: Color;
  txtColor: Color;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  buttonText,
  options,
  onSelect,
  accent,
  txtColor,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={styles["dropdown"]}>
      <Button
        accent={accent}
        txtColor={txtColor}
        onClick={() => setIsOpen(!isOpen)}
      >
        {buttonText}
      </Button>
      {isOpen && (
        <ul
          className={styles["dropdown__options"]}
          style={{
            display: isOpen ? "block" : "none",
          }}
        >
          {options.map(({ label, icon }) => (
            <li
              key={label}
              className={styles["dropdown__option"]}
              onClick={() => handleOptionClick(label)}
            >
              <label>{label}</label>
              {icon}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownButton;
