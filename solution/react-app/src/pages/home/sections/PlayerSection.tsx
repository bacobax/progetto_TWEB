import React, {useEffect, useState} from 'react'
import Section from "../../../components/containers/Section";
import styles from "./PlayerSection.module.css";
import PlayerCard from "../../../components/PlayerCard";
import {animatedButtonProps, URL_SHORT_PLAYERS} from "../../../constants/constants";
import {useSlice} from "../../../hooks/useSlice";
import Button from "../../../components/UI/button/Button";
import {useNavigate} from "react-router-dom";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import IconButton from "../../../components/UI/button/IconButton";
import useFetch from "../../../hooks/useFetch";
import {ShortPlayer} from "../../../constants/types";

import signalWindowSize from "../../../hooks/signalWindowSize";

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

    const width = signalWindowSize.value.width;

    const [players, setPlayers] = useState<ShortPlayer[]>([]);
    const {current, next, prev , currentIdx} = useSlice(players, width < 768 ? 2: 4);

    const {loading, error, setError, fetchData} = useFetch();

    useEffect(() => {
            fetchData<{ data:ShortPlayer[], status:string, message?:string }>({url: URL_SHORT_PLAYERS, method: "GET"}, (data) => {
                console.log({data})
                if(data.status !== "success"){
                    setError(data.message? data.message: "An error occurred");
                    return;
                }
                if(!data.data){
                    setError("An error occurred");
                    return;
                }
                setPlayers(data.data);

            });
    }, [fetchData, setError]);

    return (
        <Section name={name} className={styles.container}>
            <h1>Players</h1>
            <div className={styles.cardGallery}>
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
            </div>

            <div className={styles.buttons}>
                <IconButton {...animatedButtonProps} Icon={GrCaretPrevious} className={styles.next} onClick={prev} text={"Prev"} />
                {currentIdx + 1 }
                <IconButton {...animatedButtonProps} Icon={GrCaretNext} className={styles.prev} onClick={next} text={"Next"} />

            </div>
            <Button {...animatedButtonProps}
                className={styles.moreButton} onClick={()=>{navigate("/gallery")}}>More</Button>


        </Section>
    );

}

export default PlayerSection;