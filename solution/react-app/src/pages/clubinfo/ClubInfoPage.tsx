import {FC} from "react";
import {ClubInfo} from "../../components/Club/ClubInfo";
import {Navigate, useParams} from "react-router-dom";



const ClubInfoPage:FC = () => {

    const params = useParams();

    const {id} = params;

    return (
        <div className={"min-w-[100vw] flex items-center justify-center p-[20px]"}>
            {id && <ClubInfo id={id}/>}
            {!id && <Navigate to={"/"}/>}
        </div>
    );
};


export default ClubInfoPage;