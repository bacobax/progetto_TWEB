import {FC, useEffect, useState} from "react";
import {MyBreadcrumbs} from "../common/MyBreadcrumbs";
import useFetch from "../../hooks/useFetch";
import {calculateAgeFromDateBirth, MilionFormat, URL_CLUB_INFO} from "../../constants/constants";
import Loading from "../animations/Loading";
import {FetchError} from "../common/errors/FetchError";
import {ClubInfoTable} from "./ClubInfoTable";
import {Club} from "./types";

interface ClubInfoProps {
    id: string;
}




//format date to dd/mm/yyyy
/**
 * ClubInfo is a functional component in React.
 * It accepts props of type ClubInfoProps which includes:
 * - id: A string representing the ID of the club.
 *
 * The component maintains a state variable club, which is the club object retrieved from the server.
 * The useFetch custom hook is used to manage the fetching of the club data.
 *
 * The useEffect hook is used to fetch the club data when the component mounts. The fetchData function from the useFetch hook is called with the URL of the club data.
 * If the fetch is successful, the club state is updated with the retrieved data. If the fetch fails, the error state is updated with the error message.
 *
 * If the club data is still loading, a Loading component is returned.
 * If there is an error fetching the club data, a FetchError component is returned.
 *
 * The component calculates the total value and average age of the club's players using the reduce method.
 *
 * The component returns a div element with the club information. The div includes:
 * - A MyBreadcrumbs component displaying the navigation path.
 * - A header with the club name and total market value.
 * - A section with various club details.
 * - A ClubInfoTable component displaying the club's players.
 */
export const ClubInfo:FC<ClubInfoProps> = ({id}) => {

    const [club, setClub] = useState<Club | null>(null);
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


    const totalValue = club.players.reduce((acc, player) => acc + Number(player.market_value_in_eur), 0);
    const avarageAge = club.players.reduce((acc, player) => acc + calculateAgeFromDateBirth(player.date_of_birth), 0) / club.players.length;
    return (
        <div className={"flex flex-col gap-[30px] max-w-full"}>
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

            <div className={"w-full overflow-auto"}>
                <ClubInfoTable players={club.players} />

            </div>


        </div>
    );
};
