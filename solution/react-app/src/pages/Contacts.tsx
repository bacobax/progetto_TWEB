import NeuromorphismDiv from "../components/UI/NeuromorphismDiv";
import React, {FC} from "react";
import {GlobalNavbar} from "../components/common/navbar/GlobalNavbar";

export const Contacts:FC = () => {
    return (
        <>
            <GlobalNavbar />
            <div className="flex text-white items-center flex-col gap-[100px] justify-center h-screen bg-transparentfont-sansDM ">

                <h1 className={" text-5xl font-bold  w-1/2 text-center"}>Contacts</h1>

                <NeuromorphismDiv clickable={false} className="rounded-medium flex flex-col items-center justify-center w-1/3 h-1/2">
                    <label className={"text-2xl"}> Mail:</label>
                    <a href={"mailto:francesco.bassignana@edu.unito.it"} className={"underline underline-offset-2 hover:text-primary-300"}>francesco.bassignana@edu.unito.it</a>
                </NeuromorphismDiv>
            </div>
        </>

    );
};
