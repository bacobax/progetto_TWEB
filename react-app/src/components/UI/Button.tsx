import React from "react";
import styles from "./Button.module.css";
import { Color } from "../../constants/colorPalette";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  accent: Color;
  txtColor: Color;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  children,
  accent,
  txtColor,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${accent.DARK.CLASS_NAME} ${txtColor.DARK.CLASS_NAME}`}
    >
      {children}
    </button>
  );
};

export default Button;
