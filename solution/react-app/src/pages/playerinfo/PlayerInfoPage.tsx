import {FC} from "react";
import {useParams} from "react-router-dom";
import {PlayerInfo} from "./PlayerInfo";


export const PlayerInfoPage:FC = () => {
    const params = useParams();

    const {id} = params;
    console.log({id})

    if(id){
        return (
            <div className={"min-w-[100vw] flex items-center justify-center p-[20px]"}>
                <PlayerInfo id={id}/>
            </div>
        );
    }else{
        return null;
    }

};
