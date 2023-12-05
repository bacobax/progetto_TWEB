import React from 'react'
import Section from "../../../components/containers/Section";
import styles from "./PlayerSection.module.css";
import PlayerCard from "../../../components/PlayerCard";
import {animatedButtonProps, DUMMY_HOME_PLAYERS} from "../../../constants/constants";
import {useSlice} from "../../../hooks/useSlice";
import useWindowSize from "../../../hooks/useWindowSize";
import Button from "../../../components/UI/button/Button";
import {useNavigate} from "react-router-dom";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import IconButton from "../../../components/UI/button/IconButton";
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
    const {width} = useWindowSize();
    const {current, next, prev} = useSlice(DUMMY_HOME_PLAYERS, width < 768 ? 2: 4);




    return (
        <Section name={name} className={styles.container}>
            <h1>Players</h1>
            <div className={styles.cardGallery}>
                {
                    current.map((player) => (
                        <PlayerCard key={player.id} {...player}/>
                        )
                    )
                }
            </div>

            <div className={styles.buttons}>
                <IconButton {...animatedButtonProps} Icon={GrCaretPrevious} className={styles.next} onClick={prev} text={"Prev"} />
                <IconButton {...animatedButtonProps} Icon={GrCaretNext} className={styles.prev} onClick={next} text={"Next"} />

            </div>
            <Button {...animatedButtonProps}
                className={styles.moreButton} onClick={()=>{navigate("/gallery")}}>More</Button>


        </Section>
    );

}

export default PlayerSection;