import React from "react";

import {TeamSmartGallery} from "../../components/Club/TeamSmartGallery";
import {GlobalNavbar} from "../../components/common/navbar/GlobalNavbar";




const Gallery: React.FC = ()=>{


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