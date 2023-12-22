import {FC, useEffect, useState} from "react";
import {MyBreadcrumbs} from "../../components/MyBreadcrumbs";
import {Club, Player} from "../../constants/types";
import {useNavigate} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import {calculateAgeFromDateBirth, MilionFormat, URL_CLUB_INFO, URL_PLAYER_INFO} from "../../constants/constants";
import Loading from "../../components/animations/Loading";
import {FetchError} from "../../components/errors/FetchError";
import {ClubInfoTable} from "./ClubInfoTable";

interface ClubInfoProps {
    id: string;
}




//format date to dd/mm/yyyy

export const ClubInfo:FC<ClubInfoProps> = ({id}) => {

    const [club, setClub] = useState<Club | null>(null);
    const navigate = useNavigate();
    const { fetchData, error, loading, setError } = useFetch();

    useEffect(() => {
        fetchData<{ status: string; data: Club; message?: string }>(
            { url: URL_CLUB_INFO(id) },
            (res) => {
                if (res.status !== "success") {
                    setError("Error Fetching Player Data: " + res.message);
                }
                setClub(res.data);
            }
        );
    }, [fetchData, id, setError]);

    if (loading) {
        return <Loading />;
    }
    if (!!error || !club) {
        return (
            <FetchError onClose={()=>{}} opened={true} message={`Failed to load the club, Error: ${error}`} />
        );
    }
    const breadcupbspath = [
        {
            href: "/",
            label: "Home",
        },
        {
            href: `/club/${id}`,
            label: `${club.name}`,
        },
    ];

    console.log({clubData: club});

    const totalValue = club.players.reduce((acc, player) => acc + Number(player.market_value_in_eur), 0);
    const avarageAge = club.players.reduce((acc, player) => acc + calculateAgeFromDateBirth(player.date_of_birth), 0) / club.players.length;
    return (
        <div className={"flex flex-col gap-[30px]"}>
            <MyBreadcrumbs breadcumbs={breadcupbspath} top={0} left={0}/>
            <header className={"flex flex-col sm:flex-row gap-2"}>
                <h1 className={"text-5xl font-extrabold text-corvette uppercase font-['Impact'] w-1/2"}>{club.name}</h1>
                <div className={" font-bold font-anonymousPro flex flex-col w-1/2 sm:items-end"}>
                    <div className={"flex text-violet-300 text-5xl"}><label className={"text-sm flex items-end"}>€</label>{MilionFormat(""+totalValue)}</div>
                    <label className={"text-white text-sm"}>Total market value</label>
                </div>
            </header>
            <section className={"flex flex-col p-3 text-white border-1 border-white font-anonymousPro"}>
                <label>Squad size: <b>{club.players.length}</b></label>
                <label>Stadium: <b>{club.stadiumName}</b></label>
                <label>Avarage age: <b>{Math.trunc(avarageAge)}</b></label>
                <label>Current transfer record: <b>{club.netTransferRecord}</b></label>
                <label>Foreigers: <b>{club.foreignersNumber}</b> <i>{club.foreignersPercentage}%</i></label>
            </section>
            <ClubInfoTable players={club.players} />

        </div>
    );
};
