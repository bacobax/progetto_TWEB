import {Club, ShortClub, ShortPlayer} from "../constants/types";
import {useEffect, useState} from "react";
import {URL_SHORT_PLAYERS, URL_SHORT_TEAMS} from "../constants/constants";
import useFetch from "./useFetch";

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
    const [clubs,setClubs] = useState<ShortClub[]>([]);
    const [pageNumber , setPageNumber] = useState(1);
    const { loading, fetchData, error, setError} = useFetch();
    const addMoreTeams = () => {

        fetchData<Club[]>({
            url: URL_SHORT_TEAMS(pageNumber + 1,pageSize),
            method: "GET"
        },(data) => {

            const shortClubs = data.map(getshortclubFromClub);

            setClubs(prev => [...prev, ...shortClubs])

            setPageNumber(prev => prev + 1);
        });

    }
    useEffect(() => {
        fetchData<Club[]>({url: URL_SHORT_TEAMS(1, pageSize), method: "GET"}, (data) => {
            console.log({data})
            setClubs(data.map(getshortclubFromClub));
        });
    }, [fetchData, pageSize]);

    return {clubs, loading, error , addMoreTeams};
}

export default useLoadTeams;