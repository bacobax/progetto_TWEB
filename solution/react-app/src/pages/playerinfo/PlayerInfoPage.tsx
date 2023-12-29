import {FC} from "react";
import {useParams} from "react-router-dom";
import {PlayerInfo} from "./PlayerInfo";


const PlayerInfoPage:FC = () => {
    const params = useParams();

    const {id} = params;

    if(id){
        return (
            <div className={"w-[100vw] flex items-center justify-center p-[20px]"}>
                <PlayerInfo id={id}/>
            </div>
        );
    }else{
        return null;
    }

};
export default PlayerInfoPage;