import React from "react";

import {Outlet} from "react-router-dom";




const Gallery: React.FC = ()=>{


    return <div style={{
        minHeight: "100vh",
        minWidth : "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    }}>

        <Outlet />


    </div>
}

export default Gallery;