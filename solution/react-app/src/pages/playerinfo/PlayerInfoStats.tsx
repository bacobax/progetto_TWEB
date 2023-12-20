import {FC} from "react";
import {PlayerStats} from "../../constants/types";
interface PlayerInfoStatsProps {
    stats: PlayerStats;
}

const mapLabel:{[key:string]:string} ={
    appearances: "Appearances",
    minutes_played : "Minutes Played",
    goals: "Goals",
    assists: "Assists",
    red_cards: "Red Cards",
    yellow_cards: "Yellow Cards",
}

export const PlayerInfoStats:FC<PlayerInfoStatsProps> = ({stats}) => {
    return (
        <div className={"w-full flex flex-wrap gap-[10px] font-anonymousPro"}>
            {stats && Object.keys(stats).map(key => (
                <div className={"flex text-white w-1/2 justify-between"} key={key}>
                    <label>
                        {mapLabel[key]}: {" "}
                    </label>
                    <div>
                        {/*@ts-ignore*/}
                        <b>{stats[key]}</b>
                    </div>
                </div>
            ))}

        </div>
    );
};
