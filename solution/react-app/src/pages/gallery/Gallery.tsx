import React from "react";

import {Outlet} from "react-router-dom";
import {TeamSmartGallery} from "./TeamSmartGallery";
import {MyBreadcrumbs} from "../../components/MyBreadcrumbs";
import {GlobalNavbar} from "../../components/navbar/GlobalNavbar";




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