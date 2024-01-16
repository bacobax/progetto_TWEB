import {useCallback} from "react";
import {URL_SHORT_PLAYERS} from "../constants/constants";
import {useAsyncList} from "@react-stately/data";
import {ShortPlayer} from "../components/Player/types";


const useLoadPlayers = (pageSize: number) => {

    const list = useAsyncList<ShortPlayer>({
        async load({signal,cursor}){
            const url = cursor || URL_SHORT_PLAYERS(1,pageSize);
            const response = await fetch(url,{signal});
            const json = await response.json();
            const players = json.data.map((player:ShortPlayer)=>player);
            return {
                items: players,
                cursor: json.nextRequestURL
            };
        }
    })

    const addMorePlayers =useCallback (() => {
        list.loadMore();
    },[list]);

    return {loading:list.isLoading, error: list.error?.message, players:list.items, addMorePlayers};
};

export default useLoadPlayers;