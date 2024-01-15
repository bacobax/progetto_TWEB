import React from 'react'
import Section from "../../../components/containers/Section";
import PlayerCard from "../../../components/PlayerCard";
import {animatedButtonProps, ROUTES} from "../../../constants/constants";
import {useSlice} from "../../../hooks/useSlice";
import {useNavigate} from "react-router-dom";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";


import {Divider, Pagination, ScrollShadow,Button} from "@nextui-org/react";
import useLoadPlayers from "../../../hooks/useLoadPlayers";
import useWindowSize from "../../../hooks/useWindowSize";

interface PlayerSectionProps {
    name: string;
}

/**
 * Summary
 * This code defines a React functional component called PlayerSection that displays a section of player cards. It uses various imported components and hooks to handle navigation, window size, and slicing of player data.
 * @example
 * <PlayerSection name="Home Players" />
 * Inputs
 * @param name (string): The name of the player section.
 * @constructor
 */
const PlayerSection: React.FC<PlayerSectionProps> = ({name}) => {
    const navigate = useNavigate();
    const {width} = useWindowSize()
    const {players, error, loading} = useLoadPlayers(30);
    const {current , currentIdx, setIndex, matrixLength} = useSlice(players, width < 768 ? 2: 3);




    return (
        <Section name={name} className={"flex flex-col gap-16"}>


            <h1 className={"text-5xl text-corvette"}>Players</h1>
            <div className={"text-green-400 flex items-center text-xl font-bold"}>
                <MdKeyboardDoubleArrowUp />
                <h3> Market Value (eur)</h3>
            </div>
            <ScrollShadow orientation={"horizontal"} className={"w-full flex justify-around gap-[20px]"}>
                {
                    !loading && !error && current.map((player) => (
                        <PlayerCard key={player._id} {...player}/>
                        )
                    )
                }
                {
                    loading && <p>Loading...</p>
                }
                {
                    error && <p>{error}</p>
                }
            </ScrollShadow>


            <Pagination className={`dark cursor-pointer`} color={"secondary" } total={matrixLength} page={currentIdx + 1} onChange={index => setIndex(index-1)} />
            <Button onClick={()=>{navigate(ROUTES.PLAYERS)}} className={"bg-corvette"} size={"lg"}>
                More
            </Button>
            <Divider orientation={"horizontal"} className={"my-4"} />




        </Section>
    );

}

export default PlayerSection;