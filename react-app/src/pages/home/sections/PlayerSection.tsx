import React from 'react'
import Section from "../../../components/containers/Section";
import styles from "./PlayerSection.module.css";
import PlayerCard from "../../../components/PlayerCard";
import DummyProfileImage from "../../../assets/messi.jpg";
import {LOREM_IPSUM} from "../../../constants/constants";
import {Player} from "../../../constants/types";
import {useSlice} from "../../../hooks/useSlice";
import useWindowSize from "../../../hooks/useWindowSize";
import Button from "../../../components/UI/button/Button";
interface PlayerSectionProps {
    name: string;
}


const DUMMY_PLAYERS: Player[] = [
    {
        name: "Messi0",
        image: DummyProfileImage,
        description: LOREM_IPSUM,
        country: "Argentina",
        age: 33,
        id: 0,
        generalScore: 10
    },
    {
        name: "Messi1",
        image: DummyProfileImage,
        description: LOREM_IPSUM,
        country: "Argentina",
        age: 33,
        id: 1,
        generalScore: 9
    },
    {
        name: "Messi2",
        image: DummyProfileImage,
        description: LOREM_IPSUM,
        country: "Argentina",
        age: 33,
        id: 2,
        generalScore: 8

    },
    {
        name: "Messi3",
        image: DummyProfileImage,
        description: LOREM_IPSUM,
        country: "Argentina",
        age: 33,
        id: 3,
        generalScore: 7
    },
    {
        name: "Messi4",
        image: DummyProfileImage,
        description: LOREM_IPSUM,
        country: "Argentina",
        age: 33,
        id: 4,
        generalScore: 6
    },
    {
        name: "Messi5",
        image: DummyProfileImage,
        description: LOREM_IPSUM,
        country: "Argentina",
        age: 33,
        id: 5,
        generalScore: 5
    }
]

const PlayerSection: React.FC<PlayerSectionProps> = ({name}) => {
    const {width} = useWindowSize();
    const {current, next, prev} = useSlice(DUMMY_PLAYERS, width < 768 ? 2: 4);




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