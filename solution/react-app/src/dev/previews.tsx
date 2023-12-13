import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import App from "../App";
import MainSection from "../pages/home/sections/MainSection";
import {HOME_SECTIONS} from "../constants/constants";
import FancyHeader from "../components/FancyHeader";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/MainSection">
                <MainSection name={HOME_SECTIONS.HOME.name}/>
            </ComponentPreview>
            <ComponentPreview path="/ComponentPreviews">
                <ComponentPreviews/>
            </ComponentPreview>
            <ComponentPreview path="/FancyHeader">
                <FancyHeader title={"Welcome to football app"}/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;