import {FC, useState} from "react";
import {GameFiltersForm} from "./GameFiltersForm";
import useFetch from "../../hooks/useFetch";
import {Game} from "../../constants/types";
import {URL_GAMES} from "../../constants/constants";
import {FetchError} from "../../components/errors/FetchError";
import MemoizedMap from "../../components/containers/MemoizedMap";
import {GameCard} from "../../components/GameCard";

interface StringKeys {
    [key: string]: string | undefined
}
export interface QueryFilters extends StringKeys{
    competition_id: string | undefined;
    season: string | undefined;
    competition_type: string | undefined;
}


export const Games:FC = () => {


    const [games, setGames] = useState<Game[]>([]);
    const {loading, setError, error, fetchData} = useFetch();
    const handleApplyFilters = (filters: QueryFilters) => {
        fetchData<{status:string, results: number, data:Game[], message?:string}>({
            url: URL_GAMES(filters),
        } , (data) =>{
            if(data.status!== "success"){
                return setError(data.message || "Error");
            }
            setGames(data.data);
        })
    }

    if(!!error){
        return <FetchError opened={true} onClose={()=>setError("")} message={error} />
    }

    return (
        <div className={"w-full flex flex-col items-center gap-5"}>
            <h1 className={"text-5xl font-['Impact'] text-corvette"}>GAMES</h1>
            <GameFiltersForm onApplyFilters={handleApplyFilters} idLoading={loading}/>
            {!loading && games.length > 0 && <MemoizedMap items={games} className={"flex flex-wrap gap-4 w-full justify-center h-fit"}>
                {(game) => <GameCard {...game } key={game._id} className={"w-4/5 max-w-[550px]"} />}
            </MemoizedMap>}
        </div>
    );
};
