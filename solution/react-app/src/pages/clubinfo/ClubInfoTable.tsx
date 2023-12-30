import {FC, useCallback, useMemo, useState} from "react";
import {
    Button,
    getKeyValue, Pagination, Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip
} from "@nextui-org/react";
import {CiCircleMore} from "react-icons/ci";
import {PlayerInsideClub} from "../../constants/types";
import {calculateAgeFromDateBirth, countryEmojis, identity, MilionFormat} from "../../constants/constants";
import {useNavigate} from "react-router-dom";

const tableColumns = [
    { key: "first_name", label: "Player Name" },
    { key: "last_name", label: "Player Surname"},
    { key: "date_of_birth", label: "Age" },
    { key: "country_of_citizenship", label: "Nat" },
    { key: "contract_expiration_date", label: "Contract Expiration" },
    { key: "market_value_in_eur", label: "Market value (EUR)" },
    {key: "action" , label: "Action"}
]

const dateFormatter = (date:string):string => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth()+1;
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
}
const transformationMap:{[key:string]: (value:string) => (string|number)} = {
    market_value_in_eur: MilionFormat,
    date_of_birth: calculateAgeFromDateBirth,
    first_name: identity,
    last_name: identity,
    country_of_citizenship: (country:string)=>country !== null ? `${country} ${countryEmojis[country.toLowerCase()] || ""}` : "NOT PROVIDED",
    contract_expiration_date: dateFormatter,
}
const ROWS_PER_PAGE = 6;

interface ClubInfoTableProps {
    players: PlayerInsideClub[];
}
export const ClubInfoTable:FC<ClubInfoTableProps> = ({players}) => {

    const [page, setPage] = useState(1);
    const navigate = useNavigate()

    const moreButtonHandler = useCallback ((id:string) => {
        navigate(`/player/${id}`);
    },[navigate]   );

    const pages = Math.ceil(players.length / ROWS_PER_PAGE);

    const items = useMemo(() => {
        const start = (page - 1) * ROWS_PER_PAGE;
        const end = start + ROWS_PER_PAGE;

        return players.slice(start, end);
    }, [page, players]);

    return (
        <Table className={"dark text-white font-anonymousPro max-w-full self-start"} aria-label="Example table with dynamic content"
               bottomContent={
                   <div className="flex w-full justify-center">
                       <Pagination
                           isCompact
                           showControls
                           showShadow
                           color="secondary"
                           page={page}
                           total={pages}
                           onChange={(page) => setPage(page)}
                       />
                   </div>
               }
        >
            <TableHeader columns={tableColumns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={items}>
                {(player) => (
                    <TableRow key={player.id}>
                        {(columnKey) => {
                            const value = getKeyValue(player, columnKey);
                            if(columnKey !== "action"){
                                const transformedValue = transformationMap[columnKey](columnKey === "market_value_in_eur" ? ""+value : value);
                                const myClassName = transformedValue === "NOT PROVIDED" ? "text-gray-500" : undefined;

                                return (
                                    <TableCell className={myClassName} >{transformedValue}</TableCell>
                                )}

                            return (
                                <TableCell>
                                    <Tooltip content={"View more on this player"} className={"dark text-white"}>
                                    <Button size={"sm"} isIconOnly onClick={()=>{moreButtonHandler(player.id)}}>
                                            <CiCircleMore className={"w-3/4 h-3/4 text-primary-800"}/>
                                        </Button>
                                    </Tooltip>
                                </TableCell>
                            )

                        }}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};
