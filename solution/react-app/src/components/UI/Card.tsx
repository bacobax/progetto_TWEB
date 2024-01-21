import React, {forwardRef, FC} from "react";
import styles from "./Card.module.css";
interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Card is a functional component in React that uses the forwardRef function to get a reference to the div element that wraps the children.
 * It accepts props of type CardProps which includes:
 * - children: The child elements to be rendered within the Card component.
 * - className: A string representing the CSS classes to be applied to the Card component.
 *
 * @param {object} props - The properties passed to the component.
 * @param {ReactNode} props.children - The child elements to be rendered within the Card component.
 * @param {string} props.className - The CSS classes to be applied to the Card component.
 * @param {object} ref - A reference to the div element that wraps the Card component.
 *
 * @returns {ReactElement} The rendered Card component.
 *
 * The component returns a div element that wraps the children. The div is styled with CSS classes from the Card.module.css file and any additional classes passed in the className prop.
 * The ref prop is passed to the div element, allowing parent components to access the div element directly.
 */
const Card=forwardRef<HTMLDivElement, CardProps> (({children, className},ref) => {
  return <div ref={ref} className={styles["card"] + " " + className}>{children}</div>;
});

export default Card;
