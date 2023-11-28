import React from "react";
import {Player} from "../../constants/types";
import SmartGallery from "./SmartGallery";
import MessiImage from "../../assets/messi.jpg"
import {DUMMY_GALLERY_PLAEYERS} from "../../constants/constants";




const Gallery: React.FC = ()=>{
    return <div style={{
        minHeight: "100vh",
        minWidth : "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    }}>

        <SmartGallery elements={DUMMY_GALLERY_PLAEYERS} />

    </div>
}

export default Gallery;