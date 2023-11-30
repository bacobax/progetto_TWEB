import React from 'react'
import Section from "../../../components/containers/Section";
import styles from "./PlayerSection.module.css";
import PlayerCard from "../../../components/PlayerCard";
import {DUMMY_HOME_PLAYERS} from "../../../constants/constants";
import {useSlice} from "../../../hooks/useSlice";
import useWindowSize from "../../../hooks/useWindowSize";
import Button from "../../../components/UI/button/Button";
import {useNavigate} from "react-router-dom";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import IconButton from "../../../components/UI/button/IconButton";
interface PlayerSectionProps {
    name: string;
}


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
                <IconButton Icon={GrCaretPrevious} className={styles.next} onClick={prev} text={"Prev"} />
                <IconButton Icon={GrCaretNext} className={styles.prev} onClick={next} text={"Next"} />

            </div>
            <Button className={styles.moreButton} onClick={()=>{navigate("/gallery")}}>More</Button>


        </Section>
    );

}

export default PlayerSection;