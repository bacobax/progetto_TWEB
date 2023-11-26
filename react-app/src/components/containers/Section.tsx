//100vh section to smooth scrolling

import React from "react";
import styles from "./Section.module.css";
import {Element} from "react-scroll";
interface Props extends React.HTMLAttributes<HTMLElement>{
  children: React.ReactNode;
  name: string;
}

const Section: React.FC<Props> = ({ children,name, ...restProps }) => {
  return <Element name={name} style={{color:"white"}} className={styles.section + " " + restProps.className} {...restProps}>{children}</Element>;
};

export default Section;