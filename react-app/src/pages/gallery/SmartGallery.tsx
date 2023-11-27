import React from "react";
import styles from "./SmartGallery.module.css";
import Button from "../../components/UI/button/Button";


interface SmartGalleryProps<T> {
    children: (el: T) => React.ReactNode;
    elements: T[];

}
// notice the trailing comma after <T
const SmartGallery = <T,>({ children, elements }: SmartGalleryProps<T>) => {
    return (
        <div className={styles.container}>
            <header>
                <h1>Gallery</h1>
                <Button className={styles.filterButton}>Filter</Button>
            </header>
            <main>
                {elements.map(children)}
            </main>

        </div>
    )
};
export default SmartGallery;