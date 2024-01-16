import {FC,  useState} from "react";
import {
    Button, Divider,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import {Link} from "react-router-dom"
import {renderTableCell} from "../Game/GameStats";
import {PlayerStats} from "./types";
import {GameEvent} from "../Game/types";
interface PlayerInfoStatsProps {
    stats: PlayerStats & { competitionName?: string },
    events?: GameEvent[],
    permitGameEventsShow: boolean
}

const mapLabel:{[key:string]:string} ={
    appearances: "Appearances",
    minutes_played : "Minutes Played",
    goals: "Goals",
    assists: "Assists",
    red_cards: "Red Cards",
    yellow_cards: "Yellow Cards",
}
//TODO: mettere i gameEvents di questo giocatore in questa lega

const tableColumns = [
    { key: "minute", label: "Minute"},
    { key: "type", label: "Type" },
    { key: "player", label: "Player" },
    { key: "description", label: "Desc" },
    {key: "player_assist" , label: "Player Assist"}
]
const gameIdsFromEvents = (events: GameEvent[]) => {
    const gameIds = events.map((event) => event.game_id);
    // @ts-ignore
    return [...new Set(gameIds)];
}


const separateEventsByGameID = (events: GameEvent[]) => {
    const gameIds = gameIdsFromEvents(events);
    const eventsByGameID: { [key: string]: GameEvent[] } = {};
    gameIds.forEach((gameID) => {
        eventsByGameID[gameID] = events.filter((event) => event.game_id === gameID);
    });
    return eventsByGameID;
}

const getEntriesWithNoSubstitutions = (eventsByGameID: { [key: string]: GameEvent[] }) => Object.entries(eventsByGameID)
    .filter(([gameID, events]) => events.filter(GE => GE.type !== "Substitutions").length > 0);


export const PlayerInfoStats:FC<PlayerInfoStatsProps> = ({ stats, events, permitGameEventsShow }) => {

    const {competitionName, ...effectiveStats} = stats;

    const [showEvents, setShowEvents] = useState(false);

    const toggleShowEvents = () => setShowEvents(p => !p);



    const eventsByGamesIDS = events ? separateEventsByGameID(events) : null;

    return (
        <div className="font-anonymousPro w-full flex flex-col gap-10">
            <div className="flex flex-wrap gap-[10px]">
                {effectiveStats && Object.entries(effectiveStats).map(([key, value]) => (
                    <div className="flex text-white w-1/2 justify-between" key={key}>
                        <label>{mapLabel[key]}: </label>
                        <div><b>{value}</b></div>
                    </div>
                ))}
            </div>
            {permitGameEventsShow && eventsByGamesIDS &&
                <div className="flex flex-col gap-[30px]">
                    {getEntriesWithNoSubstitutions(eventsByGamesIDS).length > 0 &&
                        <Button size="lg" className="w-full" onClick={toggleShowEvents}
                            color={showEvents ? "warning" : "primary"}>
                            {showEvents ? "Hide" : "Show"} All Player's events {!showEvents && "(Advanced)"}
                        </Button>
                    }
                    {showEvents && getEntriesWithNoSubstitutions(eventsByGamesIDS)
                        .map(([key, events], idx) => (
                            <div key={idx}>
                                <h1 className="w-full text-center text-green-400 font-bold">
                                    <Link to={`/games?game_id=${key}`}>
                                        Game: {events[0].game?.home_club_name} v/s {events[0].game?.away_club_name}
                                    </Link>
                                </h1>
                                <Table className="dark text-white font-anonymousPro" aria-label="player game events">
                                    <TableHeader columns={tableColumns}>
                                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                                    </TableHeader>
                                    <TableBody items={events.filter(GE => GE.type !== "Substitutions")}>
                                        {gameEvent => (
                                            <TableRow key={gameEvent._id}>
                                                {(columnKey) => <TableCell>{renderTableCell({label: columnKey, gameEvent})}</TableCell>}
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                                {idx !== Object.keys(eventsByGamesIDS).length - 1 && <Divider className="bg-white"/>}
                            </div>
                        )
                    )}
                </div>
            }
        </div>
    );
};