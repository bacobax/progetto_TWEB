import React from 'react'
import Section from "../../../components/containers/Section";
import styles from "./PlayerSection.module.css";
import PlayerCard from "../../../components/PlayerCard";
import {animatedButtonProps} from "../../../constants/constants";
import {useSlice} from "../../../hooks/useSlice";
import Button from "../../../components/UI/button/Button";
import {useNavigate} from "react-router-dom";


import {Divider, Pagination, ScrollShadow} from "@nextui-org/react";
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
    const {current , currentIdx, setIndex, matrixLength, index} = useSlice(players, width < 768 ? 2: 4);



    return (
        <Section name={name} className={styles.container}>
            <h1>Players</h1>
            <ScrollShadow orientation={"horizontal"} className={styles.cardGallery}>
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


            <Pagination className={`dark ${styles.pagination} cursor-pointer`} color={"secondary" } total={matrixLength} page={currentIdx} onChange={setIndex} />
            <Divider orientation={"horizontal"} className={"my-4"} />
            <Button {...animatedButtonProps} className={styles.moreButton} onClick={()=>{navigate("/gallery/players")}}>
                More
            </Button>


        </Section>
    );

}

export default PlayerSection;