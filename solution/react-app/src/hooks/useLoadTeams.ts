import {Club, ShortClub} from "../constants/types";
import {useCallback} from "react";
import {URL_SHORT_TEAMS} from "../constants/constants";
import {useAsyncList} from "@react-stately/data";

/*const getshortclubFromClub = (club:Club):ShortClub => {
    const {clubId, url, name, squadSize, stadiumName, lastSeason,domesticCompetition, totalMarketValue, ...others}=club;
    const {name: competitionName,competitionId} =domesticCompetition;
    return {
        clubId,
        url,
        name,
        squadSize,
        stadiumName,
        lastSeason,
        totalMarketValue,
        domesticCompetition:{
            competitionId,
            name:competitionName
        },
    }
}*/
const useLoadTeams = (pageSize: number) => {


    const list = useAsyncList<Club>({
        async load({signal,cursor}){
            const url = cursor || URL_SHORT_TEAMS(1,pageSize);
            const response = await fetch(url,{signal});
            const json = await response.json();

            return {
                items: json.items,
                cursor: json.nextPageURL
            };
        }
    })

    const loadMore = useCallback (() => {
        list.loadMore();
    },[list]);

    return {clubs:list.items.filter(c => c.totalMarketValue !== null), loading:list.isLoading, error:list.error, loadMore};
}

export default useLoadTeams;