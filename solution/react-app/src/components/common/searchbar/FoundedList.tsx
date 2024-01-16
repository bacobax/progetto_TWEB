import {ResponseType} from "./SearchBar";
import FoundedItem from "./FoundedItem";
import React from "react";
import styles from "./FoundedList.module.css";
import {Accordion, AccordionItem, Skeleton} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";

const FoundedList: React.FC<{ data: ResponseType, loading:boolean }> = ({data, loading}) => {
    const navigate = useNavigate();

    const mapClubs = ({clubId, name}: {clubId:number, name:string}) => (<FoundedItem type="team" name={name} onClick={()=>{navigate(`/club/${clubId}`)}} id={clubId} key={clubId}/>)
    const mapPlayers = ({playerId, name}: {playerId:number, name:string}) => (<FoundedItem type="player" name={name} onClick={()=>{navigate(`/player/${playerId}`)}} id={playerId} key={playerId} />)



    const listOfClubs = data.clubs.length >0 ? data.clubs.map(mapClubs) : [];
    const listOfPlayers = data.players.length >0 ? data.players.map(mapPlayers) : [];

    return (
        <ul className={styles.list}>
            {loading && Array.from({length: 3} , (_,idx) => (
                <div className="w-full flex gap-2">
                    <Skeleton className="rounded-full dark w-12 h-12"/>
                    <Skeleton className="rounded-lg dark w-full h-12" />
                </div>
            )) }
            {
                !loading && (

                    <Accordion variant={"splitted"}>
                        <AccordionItem title={"Teams"} className={"dark"} classNames={{
                            content: "flex flex-col gap-2"
                        }}>
                            {listOfClubs.map((club) => club)}
                        </AccordionItem>
                        <AccordionItem title={"Players"} className={"dark"} classNames={{
                            content: "flex flex-col gap-2"
                        }}>
                            {listOfPlayers.map((player) => player)}
                        </AccordionItem>
                    </Accordion>
                )
            }
        </ul>
    )
}

export default FoundedList;