import {Club, ShortClub} from "../constants/types";
import {useEffect, useState} from "react";
import {URL_SHORT_TEAMS} from "../constants/constants";
import useFetch from "./useFetch";


const useLoadTeams = () => {
    const [clubs,setClubs] = useState<ShortClub[]>([]);

    const { loading, fetchData, error} = useFetch();

    useEffect(() => {
        fetchData<Club[]>({url: URL_SHORT_TEAMS, method: "GET"}, (data) => {
            console.log({data})
            setClubs(data.map((club) => {
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
            }));
        });
    }, [ fetchData]);

    return {clubs, loading, error};
}

export default useLoadTeams;