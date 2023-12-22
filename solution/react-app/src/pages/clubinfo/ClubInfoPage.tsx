import {FC} from "react";
import {ClubInfo} from "./ClubInfo";
import {Navigate, useParams} from "react-router-dom";



export const ClubInfoPage:FC = () => {

    const params = useParams();

    const {id} = params;
    console.log({id})

    return (
        <div className={"min-w-[100vw] flex items-center justify-center p-[20px]"}>
            {id && <ClubInfo id={id}/>}
            {!id && <Navigate to={"/"}/>}
        </div>
    );
};
