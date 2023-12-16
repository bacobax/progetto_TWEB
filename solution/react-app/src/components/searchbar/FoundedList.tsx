import {ResponseType} from "./SearchBar";
import FoundedItem from "./FoundedItem";
import React from "react";
import styles from "./FoundedList.module.css";
import {Skeleton} from "@nextui-org/react";

const FoundedList: React.FC<{ data: ResponseType, loading:boolean }> = ({data, loading}) => {
    console.log({clubs: data.clubs, players: data.players})

    const mapClubs = ({clubId, name}: {clubId:number, name:string}) => (<FoundedItem type="team" name={name} onClick={()=>{}} id={clubId} key={clubId}/>)
    const mapPlayers = ({playerId, name}: {playerId:number, name:string}) => (<FoundedItem type="player" name={name} onClick={()=>{}} id={playerId} key={playerId} />)



    const listOfClubs = data.clubs.length >0 ? data.clubs.map(mapClubs) : [];
    const listOfPlayers = data.players.length >0 ? data.players.map(mapPlayers) : [];
    const overallList = [...listOfClubs, ...listOfPlayers];

    return (
        <ul className={styles.list}>
            {loading && Array.from({length: 3} , (_,idx) => (
                <div className="w-full flex gap-2">
                    <Skeleton className="rounded-full dark w-12 h-12"/>
                    <Skeleton className="rounded-lg dark w-full h-12" />
                </div>
            )) }
            {!loading && overallList.map((item) => item)}
        </ul>
    )
}

export default FoundedList;