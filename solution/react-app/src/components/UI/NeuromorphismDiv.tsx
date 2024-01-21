
import styles from "./NeuromorphismDiv.module.css";
import React from "react";
interface NeuromorphismDivProps extends React.HTMLAttributes<HTMLElement> {
    clickable: boolean;
}

/**
 * NeuromorphismDiv is a functional component in React.
 * It accepts props of type NeuromorphismDivProps which includes:
 * - children: The child elements to be rendered within the NeuromorphismDiv component.
 * - className: A string representing the CSS classes to be applied to the NeuromorphismDiv component.
 * - clickable: A boolean indicating whether the NeuromorphismDiv component is clickable.
 * - ...props: Any additional props are collected into this object and passed to the div element.
 *
 * The component returns a div element styled with CSS classes from the NeuromorphismDiv.module.css file. The div includes:
 * - The children prop is passed as the children of the div.
 * - The className prop is included in the list of CSS classes applied to the div.
 * - The clickable prop is used to conditionally apply the clickable CSS class from the NeuromorphismDiv.module.css file.
 * - The ...props are spread onto the div element.
 */
const NeuromorphismDiv: React.FC<NeuromorphismDivProps> = ({children, className, clickable, ...props}) => {
    return (
        <div className={`${styles.container} ${clickable ? styles.clickable : ""} ${className}`}  {...props}>
            {children}
        </div>
    );
}

export default NeuromorphismDiv;
