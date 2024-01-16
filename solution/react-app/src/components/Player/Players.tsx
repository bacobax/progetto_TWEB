import {FC, useState} from "react";
import useFetch from "../../hooks/useFetch";
import { URL_SHORT_PLAYERS_QUERIED} from "../../constants/constants";
import {FetchError} from "../common/errors/FetchError";
import MemoizedMap from "../common/containers/MemoizedMap";
import PlayerCard from "./PlayerCard";
import {PlayerFilterForm} from "./PlayerFilterForm";
import NeuromorphismDiv from "../UI/NeuromorphismDiv";
import {Player, PlayerSearchFilters} from "./types";

interface StringKeys {
    [key: string]: string | undefined
}
export interface QueryFilters extends StringKeys{
    competition_id: string | undefined;
    season: string | undefined;
    competition_type: string | undefined;
}


export const Players:FC = () => {


    const [players, setPlayers] = useState<Player[]>([]);
    const {loading, setError, error, fetchData} = useFetch();
    const handleApplyFilters = (filters: PlayerSearchFilters) => {
        console.log({filters})
        fetchData<{status:string, results: number, data:Player[], message?:string}>({
            url: URL_SHORT_PLAYERS_QUERIED(0,100,filters),
        } , (data) =>{
            if(data.status!== "success"){
                return setError(data.message || "Error");
            }
            console.log({data:data.data})
            setPlayers(data.data);
        })
    }

    if(!!error){
        return <FetchError opened={true} onClose={()=>setError("")} message={error} />
    }
    console.log({players})

    return (
        <div className={"w-full flex flex-col items-center gap-5 py-[20px]"}>
            <NeuromorphismDiv clickable={false} className={"w-4/5 flex justify-center items-center py-20 flex-col gap-[30px]"}>

            <h1 className={"text-5xl font-['Impact'] text-corvette"}>Players</h1>
                <PlayerFilterForm onApplyFilters={handleApplyFilters}/>

            </NeuromorphismDiv>
            {!loading && players.length > 0 && <MemoizedMap items={players} className={"flex flex-wrap gap-4 w-full justify-center h-fit px-20"}>
                {(player) => <PlayerCard {...player } key={player._id} className={"w-4/5"} />}
            </MemoizedMap>}
        </div>
    );
};
