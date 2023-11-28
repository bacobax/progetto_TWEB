import React from 'react'
import Section from "../../../components/containers/Section";
import styles from "./PlayerSection.module.css";
import PlayerCard from "../../../components/PlayerCard";
import {DUMMY_HOME_PLAYERS} from "../../../constants/constants";
import {useSlice} from "../../../hooks/useSlice";
import useWindowSize from "../../../hooks/useWindowSize";
import Button from "../../../components/UI/button/Button";
interface PlayerSectionProps {
    name: string;
}


const PlayerSection: React.FC<PlayerSectionProps> = ({name}) => {
    const {width} = useWindowSize();
    const {current, next, prev} = useSlice(DUMMY_HOME_PLAYERS, width < 768 ? 2: 4);




    return (
        <Section name={name} className={styles.container}>
            <h1>Players</h1>
            <div className={styles.cardGallery}>
                {
                    current.map((player) => (
                        <PlayerCard key={player.id} name={player.name} image={player.image} description={player.description} id={player.id}/>
                        )
                    )
                }
            </div>

            <div className={styles.buttons}>
                <Button onClick={prev}>Prev</Button>
                <Button onClick={next}>Next</Button>
            </div>


        </Section>
    );

}

export default PlayerSection;