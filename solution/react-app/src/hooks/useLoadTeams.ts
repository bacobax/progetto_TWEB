import {Club, ShortClub} from "../constants/types";
import {useCallback} from "react";
import {URL_SHORT_TEAMS} from "../constants/constants";
import {useAsyncList} from "@react-stately/data";

const getshortclubFromClub = (club:Club):ShortClub => {
    const {clubId, url, name, squadSize, stadiumName, lastSeason,domesticCompetition,...others}=club;
    const {name: competitionName,competitionId} =domesticCompetition;
    return {
        clubId,
        url,
        name,
        squadSize,
        stadiumName,
        lastSeason,
        domesticCompetition:{
            competitionId,
            name:competitionName
        },
    }
}
const useLoadTeams = (pageSize: number) => {


    const list = useAsyncList<ShortClub>({
        async load({signal,cursor}){
            const url = cursor || URL_SHORT_TEAMS(1,pageSize);
            const response = await fetch(url,{signal});
            const json = await response.json();
            const clubs = json.items.map((club:Club)=>getshortclubFromClub(club));
            return {
                items: clubs,
                cursor: json.nextPageURL
            };
        }
    })

    const loadMore = useCallback (() => {
        list.loadMore();
    },[list]);

    return {clubs:list.items, loading:list.isLoading, error:list.error, loadMore};
}

export default useLoadTeams;