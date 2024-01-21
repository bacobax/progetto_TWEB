import { FC, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { URL_PLAYER_INFO } from "../../constants/constants";
import Loading from "../animations/Loading";
import {Accordion, AccordionItem, Button, Image} from "@nextui-org/react";
import { PlayerInfoStats } from "./PlayerInfoStats";
import { MyBreadcrumbs } from "../common/MyBreadcrumbs";
import { IoChatbox } from "react-icons/io5";

import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {useNavigate} from "react-router-dom";
import {Player} from "./types";

interface PlayerInfoProps {
  id: string;
}

const PersonalToolTip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={"bg-black/50 p-2 rounded-md"}>
        <h1 className={"text-white"}>{label}</h1>
        <h1 className={"text-white"}>€{payload[0].value} Milion</h1>
      </div>
    );
  }
  return null;
};
/**
 * PlayerInfo is a functional component in React that displays detailed information about a player.
 * It accepts props of type PlayerInfoProps which includes:
 * - id: A string representing the ID of the player.
 *
 * The component maintains several state variables:
 * - player: An object representing the player's data, retrieved from the server.
 * - fetchData, error, loading, setError: The functions and state returned from the useFetch custom hook.
 *
 * The useEffect hook is used to fetch the player data when the component mounts. The fetchData function from the useFetch hook is called with the URL of the player data.
 * If the fetch is successful, the player state is updated with the retrieved data. If the fetch fails, the error state is updated with the error message.
 *
 * If the player data is still loading, a Loading component is returned.
 * If there is an error fetching the player data, an error message is displayed.
 *
 * The breadcupbspath constant is an array of objects representing the navigation path for the breadcrumbs.
 * The overallStatsItem constant is a React element representing the overall stats of the player.
 * The formattedData constant is an array of objects representing the player's market values in a more readable format.
 *
 * The component returns a div element with the following children:
 * - A MyBreadcrumbs component displaying the navigation path.
 * - A header with the player's name, club name, position, and image.
 * - An Accordion component displaying the player's stats for each competition.
 * - A LineChart component displaying the player's market values history.
 * - A Button component for opening a discussion about the player.
 */

export const PlayerInfo: FC<PlayerInfoProps> = ({ id }: PlayerInfoProps) => {
  const [player, setPlayer] = useState<Player | null>(null);
  const navigate = useNavigate();
  const { fetchData, error, loading, setError } = useFetch();

  useEffect(() => {
    fetchData<{ status: string; data: Player; message?: string }>(
      { url: URL_PLAYER_INFO(id) },
      (res) => {
        if (res.status !== "success") {
          setError("Error Fetching Player Data: " + res.message);
        }
        setPlayer(res.data);
      }
    );
  }, [fetchData, id, setError]);

  if (loading) {
    return <Loading />;
  }
  if (!!error || !player) {
    return (
      <div className={"w-[100vw] h-[100vh] flex items-center justify-center"}>
        <h1 className={"text-white text-xl"}>
          Cannot Fetching player data: {error}
        </h1>
      </div>
    );
  }

  const breadcupbspath = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: `/player/${id}`,
      label: [player.first_name,player.last_name].filter(Boolean).join(" "),
    },
  ];

  const overallStatsItem = (
    <AccordionItem
      key={"Overall Stats"}
      aria-label={"Overall Stats"}
      title={"Overall Stats"}
      classNames={{
        title: "text-green-400",
      }}
    >
      <PlayerInfoStats stats={player.totalStats} permitGameEventsShow={false}/>
    </AccordionItem>
  );


  const formattedData = player.market_values_in_eur!.map(
    ({ date, market_value_in_eur }) => ({
      date: new Date(date).toLocaleDateString(),
      //change the notation of the market_value_in_eur to be more readable (exponential notation, es: 5e+6 -> 5M)
      market_value_in_eur: market_value_in_eur / 1000000,
    })
  );

  return (
    <div className={"flex flex-col items-center gap-[30px] w-full"}>
      <MyBreadcrumbs breadcumbs={breadcupbspath} top={0} left={0} />
        <header className={"gap-[30px] flex flex-col w-full md:flex-row"}>
            <div className={"gap-[30px] flex flex-col"}>
                <h1
                    className={
                        "text-5xl font-extrabold text-corvette uppercase font-['Impact']"
                    }
                >
                    {player.first_name || ""} {player.last_name}
                </h1>
                <div className={"flex w-full"}>
                    <h2
                        className={
                            "text-4xl text-violet-300 font-extrabold uppercase w-1/2 flex items-center justify-center font-['Impact']"
                        }
                    >
                        {player.clubName}
                    </h2>
                    <h2
                        className={
                            "text-4xl text-violet-300 uppercase w-1/2 flex justify-end items-center "
                        }
                    >
                        {player.position}
                    </h2>
                </div>
            </div>

            <div className={"flex gap-3 w-full items-center"}>
                <Image
                    src={player.image_url}
                    alt={player.first_name}
                    width={150}
                    height={150}
                />
                <div
                    className={
                        "border-[0.5px] border-white flex flex-col flex-wrap justify-center items-start md:items-center pl-2 pr-2 font-anonymousPro w-full h-full"
                    }
                >
                    <label className={"text-white "}>
                        Date of Bird: <b>{player.date_of_birth}</b>
                    </label>
                    <label className={"text-white"}>
                        Country of Bird: <b>{player.country_of_birth}</b>
                    </label>
                    <label className={"text-white"}>
                        City of Bird: <b>{player.city_of_birth}</b>
                    </label>
                    <label className={"text-white"}>
                        Height: <b>{player.height_in_cm} cm</b>
                    </label>
                </div>
            </div>
        </header>

        <div className={"flex flex-col gap-[30px] w-full md:flex-row"}>
            <Accordion className={"dark"} variant={"splitted"} aria-label={"football Player stats"}>
                {[
                    overallStatsItem,
                    ...Object.keys(player.stats).map((competitionID) => (
                        <AccordionItem
                            key={competitionID}
                            aria-label={competitionID}
                            title={player.stats[competitionID].competitionName
                                .split("-")
                                .join(" ")
                                .toUpperCase()}
                            classNames={{
                                content: "max-h-[500px] overflow-y-auto",
                            }}
                        >
                            <PlayerInfoStats permitGameEventsShow stats={player.stats[competitionID]} events={player.gameEvents!.filter(GE => GE.game?.competition_id===competitionID)}/>
                        </AccordionItem>
                    )),
                ]}
            </Accordion>
            <div className={"w-full flex flex-col justify-center"}>
                <h1 className={"text-xl text-white font-anonymousPro w-full text-center"}>
                    Market Values History
                </h1>
                <ResponsiveContainer
                    width={"100%"}
                    height={400}
                    className={"flex justify-center "}
                >
                    <LineChart data={formattedData}>
                        <Tooltip content={<PersonalToolTip />} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Line
                            type="monotone"
                            dataKey="market_value_in_eur"
                            stroke="#8884d8"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>


        <Button endContent={<IoChatbox />} color={"secondary"} onClick={()=>{navigate(`/chat?player=${player.first_name}${player.last_name}`)}}>Open a Discussion</Button>
    </div>
  );
};
