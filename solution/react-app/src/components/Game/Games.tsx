import {FC, useEffect, useState} from "react";
import {GameFiltersForm} from "./GameFiltersForm";
import useFetch from "../../hooks/useFetch";
import {URL_GAME_BY_ID, URL_GAMES} from "../../constants/constants";
import {FetchError} from "../common/errors/FetchError";
import MemoizedMap from "../common/containers/MemoizedMap";
import {GameCard} from "./GameCard";
import useQueryParams from "../../hooks/useQueryParams";
import NeuromorphismDiv from "../UI/NeuromorphismDiv";
import {Player} from "../Player/types";

interface StringKeys {
    [key: string]: string | undefined
}
export interface QueryFilters extends StringKeys{
    competition_id: string | undefined;
    season: string | undefined;
    competition_type: string | undefined;
}


/**
 * Games is a functional component in React.
 * It does not accept any props.
 *
 * The component maintains several state variables:
 * - games: An array of Player objects representing the games.
 * - loading, setError, error, fetchData: The functions and state returned from the useFetch custom hook.
 * - getQueryParam: A function for getting query parameters, retrieved from the useQueryParams hook.
 *
 * The handleApplyFilters function is a callback that handles the application of filters. It fetches the games data with the applied filters and updates the games state.
 *
 * The useEffect hook is used to fetch the game data when the component mounts. If a game_id query parameter is present, the game data for that game is fetched. Otherwise, all games data is fetched.
 *
 * If there is an error fetching the games data, a FetchError component is returned.
 *
 * The component returns a div element with the following children:
 * - A NeuromorphismDiv component containing a title and a GameFiltersForm component for filtering the games.
 * - A MemoizedMap component containing a list of GameCard components for the games. The GameCard components are only displayed if the games data is not being loaded.
 */
export const Games:FC = () => {

    const [games, setGames] = useState<Player[]>([]);
    const {loading, setError, error, fetchData} = useFetch();
    const {getQueryParam} = useQueryParams();
    const handleApplyFilters = (filters: QueryFilters) => {
        fetchData<{status:string, results: number, data:Player[], message?:string}>({
            url: URL_GAMES(filters),
        } , (data) =>{
            if(data.status!== "success"){
                return setError(data.message || "Error");
            }
            setGames(data.data);
        })
    }

    useEffect(()=>{
        const game_id = getQueryParam("game_id");
        if(!!game_id){
            fetchData<{status:string, results: number, data:Player, message?:string}>({
                url: URL_GAME_BY_ID(game_id)
            }, res => {
                if(res.status !== "success"){
                    return setError(res.message || "Error");
                }
                setGames([res.data]);
            })
        }
    },[setGames, setError, fetchData, getQueryParam])

    if(!!error){
        return <FetchError opened={true} onClose={()=>setError("")} message={error} />
    }

    return (
        <div className={"w-full flex flex-col items-center gap-5 py-[20px]"}>
            <NeuromorphismDiv clickable={false} className={"w-4/5 flex justify-center items-center py-20 flex-col gap-[30px]"}>

            <h1 className={"text-5xl font-['Impact'] text-corvette"}>GAMES</h1>
            <GameFiltersForm onApplyFilters={handleApplyFilters} idLoading={loading}/>
            </NeuromorphismDiv>
            {!loading && games.length > 0 && <MemoizedMap items={games} className={"flex flex-wrap gap-4 w-full justify-center h-fit"}>
                {(game) => <GameCard {...game } key={game._id} className={"w-4/5"} />}
            </MemoizedMap>}
        </div>
    );
};