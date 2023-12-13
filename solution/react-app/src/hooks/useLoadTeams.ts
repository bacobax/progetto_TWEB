import {useSignal} from "@preact/signals-react";
import {Club, ShortClub} from "../constants/types";
import useSignalFetch from "./signalFetch";
import {useEffect} from "react";
import {URL_SHORT_TEAMS} from "../constants/constants";


const useLoadTeams = () => {
    const clubs = useSignal<ShortClub[]>([]);

    const { loading, fetchData, error} = useSignalFetch();

    useEffect(() => {
        fetchData<Club[]>({url: URL_SHORT_TEAMS, method: "GET"}, (data) => {
            console.log({data})
            clubs.value = data.map((club) => {
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
            });
        });
    }, []);

    return {clubs, loading, error};
}

export default useLoadTeams;