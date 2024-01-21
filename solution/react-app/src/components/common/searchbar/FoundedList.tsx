import {ResponseType} from "./SearchBar";
import FoundedItem from "./FoundedItem";
import React from "react";
import styles from "./FoundedList.module.css";
import {Accordion, AccordionItem, Skeleton} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";
/**
 * FoundedList is a functional component in React.
 * It accepts props of type { data: ResponseType, loading:boolean } which includes:
 * - data: An object of type ResponseType containing the clubs and players data.
 * - loading: A boolean indicating whether the data is being loaded.
 *
 * The component uses the useNavigate hook from the react-router-dom library to get a function for navigating to different routes.
 *
 * The mapClubs and mapPlayers functions are used to map over the clubs and players arrays in the data prop and create FoundedItem components for each club and player.
 * The onClick prop of the FoundedItem components is set to a function that navigates to the club or player page when the item is clicked.
 *
 * The listOfClubs and listOfPlayers constants are arrays of FoundedItem components for the clubs and players. If there are no clubs or players, empty arrays are used.
 *
 * If the data is still being loaded, the component returns a list of Skeleton components.
 * If the data is not being loaded, the component returns a list with an Accordion component from the @nextui-org/react library. The Accordion includes AccordionItem components for the clubs and players.
 * Each AccordionItem includes the list of FoundedItem components for the clubs or players.
 */
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