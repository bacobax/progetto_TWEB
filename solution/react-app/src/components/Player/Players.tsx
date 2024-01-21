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


/**
 * Players is a functional component in React.
 * It does not accept any props.
 *
 * The component maintains several state variables:
 * - players: An array of Player objects representing the players.
 * - loading, setError, error, fetchData: The functions and state returned from the useFetch custom hook.
 *
 * The handleApplyFilters function is a callback that handles the application of filters. It fetches the players data with the applied filters and updates the players state.
 *
 * The useEffect hook is used to fetch the player data when the component mounts. The fetchData function from the useFetch hook is called with the URL of the player data.
 * If the fetch is successful, the player state is updated with the retrieved data. If the fetch fails, the error state is updated with the error message.
 *
 * If there is an error fetching the player data, a FetchError component is returned.
 *
 * The component returns a div element with the following children:
 * - A NeuromorphismDiv component containing a title and a PlayerFilterForm component for filtering the players.
 * - A MemoizedMap component containing a list of PlayerCard components for the players. The PlayerCard components are only displayed if the player data is not being loaded.
 */
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
            {!loading && players.length > 0 && <MemoizedMap items={players} className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-4 w-full justify-center h-fit px-20"}>
                {(player) => <PlayerCard {...player } key={player._id} className={"w-4/5"} />}
            </MemoizedMap>}
        </div>
    );
};