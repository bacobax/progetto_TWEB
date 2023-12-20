import {FC, useEffect, useState} from "react";
import {Player} from "../../constants/types";
import useFetch from "../../hooks/useFetch";
import {URL_PLAYER_INFO} from "../../constants/constants";
import Loading from "../../components/animations/Loading";
import {Accordion, AccordionItem, Image} from "@nextui-org/react";
import {PlayerInfoStats} from "./PlayerInfoStats";

interface PlayerInfoProps {
    id: string
}


export const PlayerInfo:FC<PlayerInfoProps> = ({id}: PlayerInfoProps) => {

    const [player, setPlayer] = useState<Player | null>(null);
    const {fetchData, error, loading, setError} = useFetch();

    useEffect(() => {
        fetchData<{ status: string, data:Player, message?:string}>({url:URL_PLAYER_INFO(id)}, (res) => {
            if(res.status!=="success"){
                setError("Error Fetching Player Data: " + res.message);
            }
            setPlayer(res.data);
        })
    }, [fetchData, id, setError]);



    if(loading){
        return <Loading />
    }
    if(!!error || !player){
        return (
            <div className={"w-[100vw] h-[100vh] flex items-center justify-center"}>
                <h1 className={"text-white text-xl"}>Cannot Fetching player data: {error}</h1>
            </div>
        )
    }
    const overallStatsItem = (
        <AccordionItem key={"Overall Stats"} aria-label={"Overall Stats"} title={"Overall Stats"}>
             <PlayerInfoStats stats={player.totalStats}/>
        </AccordionItem>
    )
    return (

            <div className={"flex flex-col items-center gap-[30px]"}>
                <h1 className={"text-5xl font-extrabold text-corvette uppercase font-['Impact']"}>{player.first_name}</h1>
                <div className={"flex w-full"}>
                    <h2 className={"text-4xl text-violet-300 font-extrabold uppercase w-1/2 flex items-center justify-center font-['Impact']"}>{player.clubName}</h2>
                    <h2 className={"text-4xl text-violet-300 uppercase w-1/2 flex justify-end "}>{player.position}</h2>
                </div>
                <div className={"flex gap-3"}>
                    <Image src={player.image_url} alt={player.first_name} width={150} height={150}/>
                    <div className={"border-[0.5px] border-white flex flex-col flex-wrap justify-center items-start pl-2 font-anonymousPro"}>
                        <label className={"text-white "}>Date of Bird: <b>{player.date_of_birth}</b></label>
                        <label className={"text-white"}>Country of Bird: <b>{player.country_of_birth}</b></label>
                        <label className={"text-white"}>City of Bird: <b>{player.city_of_birth}</b></label>
                        <label className={"text-white"}>Height: <b>{player.height_in_cm} cm</b></label>
                    </div>
                </div>

                    <Accordion className={"dark"} variant={"splitted"}>

                    {
                        [overallStatsItem,...Object.keys(player.stats).map(competitionID => (
                            <AccordionItem key={competitionID} aria-label={competitionID} title={competitionID}>
                                <PlayerInfoStats stats={player.stats[competitionID]} />
                            </AccordionItem>
                        ))]
                    }

                </Accordion>

            </div>
    );
};
