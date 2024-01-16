import {FC, Key, useState} from "react";
import {useAsyncList} from "@react-stately/data";
import {URL_GAME_EVENTS} from "../../constants/constants";
import {FetchError} from "../common/errors/FetchError";
import {
    Button,
    getKeyValue,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import {GameEvent} from "./types";

interface GameStatsProps {
    gameID: string
}

const tableColumns = [
    { key: "minute", label: "Minute"},
    { key: "type", label: "Type" },
    { key: "player", label: "Player" },
    { key: "description", label: "Desc" },
    {key: "player_assist" , label: "Player Assist"}
]


const PAGESIZE = 5;

const substitutionsTableColumns = [
    { key: "minute", label: "Minute"},
    { key: "player", label: "Player Out" },
    { key: "description", label: "Desc" },
    { key: "player_in", label: "Player In" },
]


export const renderTableCell = ({label, gameEvent}:{label: Key, gameEvent: GameEvent}) => {
    switch (label) {
        case "minute":
            return gameEvent.minute
        case "type":
            return gameEvent.type
        case "player":
            if(gameEvent.player_id === null || gameEvent.player.length === 0){
                return <p className={"text-gray-400"}>NONE</p>
            }
            return [gameEvent.player[0].first_name,gameEvent.player[0].last_name].filter(Boolean).join(" ")
        case "description":
            return gameEvent.description

        case "player_assist":
            if(gameEvent.player_assist_id === null || gameEvent.player_assist.length === 0){
                return <p className={"text-gray-400"}>NONE</p>
            }
            return [gameEvent.player_assist[0].first_name,gameEvent.player_assist[0].last_name].filter(Boolean).join(" ")
        default:
            return getKeyValue(gameEvent, label)
    }
}

export const GameStats:FC<GameStatsProps> = ({gameID}: GameStatsProps) => {




    const [hasMore, setHasMore] = useState(true);

    const [moreItemsLoading, setMoreItemsLoading] = useState(false);

    const list = useAsyncList<GameEvent>({
        async load({signal,cursor}){

            setMoreItemsLoading(true);

            const json = await fetch((cursor || URL_GAME_EVENTS(gameID, PAGESIZE)), {signal});
            const res = await json.json();

            setMoreItemsLoading(false);
            setHasMore(res.hasMore);
            return {
                items: res.data,
                cursor: res.nextRequestURL
            }
        },
        async sort({items, sortDescriptor}) {
            return {
                items: items.sort((a, b) => {
                    // @ts-ignore
                    let first = a[sortDescriptor.column];
                    // @ts-ignore
                    let second = b[sortDescriptor.column];
                    let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

                    if (sortDescriptor.direction === "descending") {
                        cmp *= -1;
                    }

                    return cmp;
                }),
            };
        },
    });




    const {items: gameEvents, isLoading: listLoading, error} = list;

    if(error){
        return <FetchError opened={true} onClose={()=>{}} message={error.message} />
    }


    return (
        <div className={"w-full flex flex-col gap-8"}>
            <Table className={"dark text-white font-anonymousPro"} bottomContent={hasMore && !listLoading ? (
                <div className="flex w-full justify-center">
                    <Button isDisabled={list.isLoading} variant="flat" onPress={list.loadMore}>
                        {moreItemsLoading && <Spinner color="white" size="sm" />}
                        Load More
                    </Button>
                </div>
            ) : null} sortDescriptor={list.sortDescriptor} onSortChange={list.sort}>
                <TableHeader columns={tableColumns}>
                    {(column) => <TableColumn allowsSorting={true} key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={gameEvents.filter(GE => GE.type!=="Substitutions")}>
                    {gameEvent => (
                        <TableRow key={gameEvent._id}>
                            {(columnKey) => <TableCell>{renderTableCell({label: columnKey, gameEvent})}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <h1 className={"text-2xl text-white font-anonymousPro font-bold w-full text-center"}>Substitutions</h1>
            <Table className={"dark text-white font-anonymousPro"} bottomContent={hasMore && !listLoading ? (
                <div className="flex w-full justify-center">
                    <Button isDisabled={list.isLoading} variant="flat" onPress={list.loadMore}>
                        {moreItemsLoading && <Spinner color="white" size="sm" />}
                        Load More
                    </Button>
                </div>
            ) : null} sortDescriptor={list.sortDescriptor} onSortChange={list.sort}>
                <TableHeader columns={substitutionsTableColumns}>
                    {(column) => <TableColumn allowsSorting={true} key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={gameEvents.filter(GE => GE.type==="Substitutions")}>
                    {gameEvent => (
                        <TableRow key={gameEvent._id}>
                            {(columnKey) => {
                                if(columnKey === "player"){
                                    return <TableCell className={"text-red-400"}>{[gameEvent.player[0].first_name,gameEvent.player[0].last_name].filter(Boolean).join(" ")}</TableCell>
                                }
                                if(columnKey === "player_in"){
                                    console.log({player_in: gameEvent.player_in})
                                    return gameEvent.player_in.length>0? <TableCell className={"text-green-400"}>{[gameEvent.player_in[0].first_name,gameEvent.player_in[0].last_name].filter(Boolean).join(" ")}</TableCell>: <TableCell>NONE</TableCell>
                                }
                                return <TableCell>{getKeyValue(gameEvent, columnKey)}</TableCell>
                            }}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

        </div>

    );
};
