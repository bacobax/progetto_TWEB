import {Game} from "../constants/types";
import {FC} from "react";
import {Accordion, AccordionItem, Avatar, Divider} from "@nextui-org/react";


//want to have a date with format ex: 2 MARCH 1999
const dateToStringFormatter = (date: string) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`;
}

const ClubAvatar = ({club_name}:{club_name:string}) => (<div className={"flex flex-col items-center gap-[8px] w-1/5"}>
    <Avatar size={"lg"} name={club_name} classNames={{base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]"}}/>
    <label className={"text-gray-400 truncate w-full"} >{club_name}</label>
</div>)

interface classNameProps {
    className?:string
}

export const GameCard:FC<Game & classNameProps> = (props) => {

    const [homeClubGoals, awayClubGoals] = props.aggregate.split(":");


    return (
        <div className={`rounded-medium bg-gray-900 text-white flex flex-col items-center p-3 gap-6 ${props.className ? props.className : ""}`}>
            <label className={"text-red-400 font-bold"}>{dateToStringFormatter(props.date)}</label>
            <label>{props.stadium}</label>
            <main className={"flex justify-around w-full"}>
                <ClubAvatar club_name={props.home_club_name} />
                <label className={"w-1/5 flex items-center justify-center text-5xl font-bold"}>
                    {homeClubGoals}
                </label>
                <b className={"w-1/5 flex items-center justify-center text-5xl font-bold"}>
                    -
                </b>
                <label className={"w-1/5 flex items-center justify-center text-5xl font-bold"}>
                    {awayClubGoals}
                </label>
                <ClubAvatar club_name={props.away_club_name} />
            </main>
            <Divider className={"bg-gray-500"}/>
            <Accordion>
                <AccordionItem title={"Stats"} classNames={{
                    title: "text-white font-bold",
                }}>
                    <h1>Ciao</h1>
                </AccordionItem>
            </Accordion>
        </div>
    );
};
