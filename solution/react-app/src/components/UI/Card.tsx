import React, {forwardRef, FC} from "react";
import styles from "./Card.module.css";
interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

const Card=forwardRef<HTMLDivElement, CardProps> (({children, className},ref) => {
  return <div ref={ref} className={styles["card"] + " " + className}>{children}</div>;
});

export default Card;
