import {Game} from "../constants/types";
import {FC, useCallback, useRef, useState} from "react";
import {Accordion, AccordionItem, Avatar, Divider} from "@nextui-org/react";
import {GameStats} from "../pages/games/GameStats";
import {motion} from "framer-motion";
import {useOutClickRef} from "../hooks/useOutClickRef";
import {useNavigate} from "react-router-dom";

//want to have a date with format ex: 2 MARCH 1999
const dateToStringFormatter = (date: string) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`;
}

const ClubAvatar = ({club_name, onClick}:{club_name:string, onClick: ()=>void}) => (
    <div className={"flex flex-col items-center gap-[8px] w-1/5 cursor-pointer hover:bg-gray-700 p-2 rounded-medium duration-250"} onClick={onClick}>
        <Avatar size={"lg"} name={club_name} classNames={{base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]"}}/>
        <label className={"text-gray-400 truncate w-full cursor-pointer"} >{club_name}</label>
    </div>
)

interface classNameProps {
    className?:string
}

export const GameCard:FC<Game & classNameProps> = (props) => {

    const [homeClubGoals, awayClubGoals] = props.aggregate.split(":");
    const [isStatisticsSeleected, setIsStatisticsSelected] = useState<boolean>(false);
    const navigate = useNavigate();

    const navigateToClubPage = useCallback((club_id: number) => {
        navigate(`/club/${club_id}`);
    },[navigate]);

    const toggleStatisticsSelected = useCallback(() => {
        setIsStatisticsSelected(prevState => !prevState);
    },[]);


    return (
        <>
            {isStatisticsSeleected && <div className={"fixed w-[100vw] h-[100vh] bg-black top-0 left-0 z-30"} />}
            <motion.div className={`rounded-medium bg-gray-900 text-white flex flex-col items-center p-3 gap-6 ${props.className ? props.className : ""}`} animate={{
                scale: isStatisticsSeleected ? 1.1 : 1,
                position:  isStatisticsSeleected ? "fixed" : "static",
                zIndex: isStatisticsSeleected ? 30 : 0,
                top: isStatisticsSeleected ? "50%" : "0%",
                left: isStatisticsSeleected ? "50%" : "0%",
                translateX: isStatisticsSeleected ? "-50%" : "0%",
                translateY: isStatisticsSeleected ? "-50%" : "0%",
                width: isStatisticsSeleected ? "80vw" : "550px",
                height: isStatisticsSeleected ? "80vh" : "fit-content",
                overflowY: isStatisticsSeleected ? "scroll" : "hidden",
                transition: {
                    duration: 0,
                    type: "spring",
                    bounce: 0.5
                }
            }}>
                <label className={"text-red-400 font-bold"}>{dateToStringFormatter(props.date)}</label>
                <label>{props.stadium}</label>
                <main className={"flex justify-around w-full"}>
                    <ClubAvatar club_name={props.home_club_name} onClick={()=>{navigateToClubPage(props.home_club_id)}}  />
                    <label className={"w-1/5 flex items-center justify-center text-5xl font-bold"}>
                        {homeClubGoals}
                    </label>
                    <b className={"w-1/5 flex items-center justify-center text-5xl font-bold"}>
                        -
                    </b>
                    <label className={"w-1/5 flex items-center justify-center text-5xl font-bold"}>
                        {awayClubGoals}
                    </label>
                    <ClubAvatar club_name={props.away_club_name} onClick={()=>{navigateToClubPage(props.away_club_id)}}/>
                </main>
                <Divider className={"bg-gray-500"}/>
                <Accordion>
                    <AccordionItem title={"Stats"} classNames={{
                        title: "text-white font-bold",
                    }} onPress={toggleStatisticsSelected} >
                        <GameStats gameID={props._id} />
                    </AccordionItem>
                </Accordion>
            </motion.div>
        </>

    );
};
