import {FC, Key, useCallback, useState} from "react";
import {useAsyncList} from "@react-stately/data";
import {GameEvent} from "../../constants/types";
import {URL_GAME_EVENTS} from "../../constants/constants";
import {FetchError} from "../../components/errors/FetchError";
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

interface GameStatsProps {
    gameID: string
}

const tableColumns = [
    { key: "minute", label: "Minute"},
    { key: "type", label: "Type" },
    { key: "player", label: "Player" },
    { key: "description", label: "Desc" },
    { key: "player_in", label: "Player In" },
    {key: "player_assist" , label: "Player Assist"}
]

const PAGESIZE = 3;




export const GameStats:FC<GameStatsProps> = ({gameID}: GameStatsProps) => {

    const renderTableCell = useCallback (({label, gameEvent}:{label: Key, gameEvent: GameEvent}) => {
        console.log({gameEvent})
        switch (label) {
            case "minute":
                return gameEvent.minute
            case "type":
                return gameEvent.type
            case "player":
                if(gameEvent.player_id === null || gameEvent.player.length === 0){
                    return "NONE"
                }
                return gameEvent.player[0].first_name + " " + gameEvent.player[0].last_name
            case "description":
                return gameEvent.description
            case "player_in":
                if(gameEvent.player_in_id === null || gameEvent.player_in.length === 0){
                    return "NONE"
                }
                return gameEvent.player_in[0].first_name+ " " + gameEvent.player_in[0].last_name
            case "player_assist":
                if(gameEvent.player_assist_id === null || gameEvent.player_assist.length === 0){
                    return "NONE"
                }
                return gameEvent.player_assist[0].first_name +  " " + gameEvent.player_assist[0].last_name
            default:
                return getKeyValue(gameEvent, label)
        }
    }, []);


    const [hasMore, setHasMore] = useState(true);


    const list = useAsyncList<GameEvent>({
        async load({signal,cursor}){

            const json = await fetch((cursor || URL_GAME_EVENTS(gameID, PAGESIZE)), {signal});
            const res = await json.json();


            console.log({res})
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

    if(listLoading){
        return <h1>Loading...</h1>
    }
    if(error){
        return <FetchError opened={true} onClose={()=>{}} message={error.message} />
    }

    console.log({gameEvents})

    return (
        <Table className={"dark text-white font-anonymousPro"} bottomContent={hasMore && !listLoading ? (
            <div className="flex w-full justify-center">
                <Button isDisabled={list.isLoading} variant="flat" onPress={list.loadMore}>
                    {list.isLoading && <Spinner color="white" size="sm" />}
                    Load More
                </Button>
            </div>
        ) : null} sortDescriptor={list.sortDescriptor} onSortChange={list.sort}>
            <TableHeader columns={tableColumns}>
                {(column) => <TableColumn allowsSorting={true} key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={gameEvents}>
                {gameEvent => (
                    <TableRow key={gameEvent._id}>
                        {(columnKey) => <TableCell>{renderTableCell({label: columnKey, gameEvent})}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};
