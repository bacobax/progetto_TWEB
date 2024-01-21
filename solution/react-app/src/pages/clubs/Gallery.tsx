import React from "react";

import {TeamSmartGallery} from "../../components/Club/TeamSmartGallery";
import {GlobalNavbar} from "../../components/common/navbar/GlobalNavbar";




/**
 * Gallery is a functional component in React.
 * It does not accept any props.
 *
 * The component returns a div element styled with inline CSS. The div includes:
 * - A GlobalNavbar component for displaying the global navigation bar.
 * - A TeamSmartGallery component for displaying the team gallery.
 *
 * The div is styled to fill the viewport and align its children in a column.
 */
const Gallery: React.FC = () => {
    return <div style={{
        minHeight: "100vh",
        minWidth : "100vw",
        display: "flex",
        flexDirection: "column",
    }}>
        <GlobalNavbar />
        <TeamSmartGallery />
    </div>
}

export default Gallery;