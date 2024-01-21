//100vh section to smooth scrolling

import React from "react";
import styles from "./Section.module.css";
import {Element} from "react-scroll";
interface Props extends React.HTMLAttributes<HTMLElement>{
  children: React.ReactNode;
  name: string;

}

/**
 * Section is a functional component in React.
 * It accepts props of type Props which includes:
 * - children: The child elements to be rendered within the Section component.
 * - name: A string representing the name of the section. This is used by the react-scroll library to identify the section for smooth scrolling.
 * - className: A string representing the CSS classes to be applied to the section.
 * - restProps: Any additional props are collected into this object and passed to the Element component.
 *
 * The component returns a fragment containing an Element component from the react-scroll library and a horizontal rule.
 * The Element component is given the name prop, a style prop with a color of white, and a className prop combining the section CSS class from the Section.module.css file and the className prop.
 * The restProps are spread onto the Element component. The children prop is passed as the children of the Element component.
 * The horizontal rule is displayed after the Element component.
 */
const Section: React.FC<Props> = ({ children,name, className, ...restProps }) => {
  return(
      <>
    <Element name={name} style={{color:"white"}} className={styles.section + " " + className} {...restProps} >{children}</Element>
        <hr/>
    </>
  );
};

export default Section;