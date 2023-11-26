import React from 'react'
import Section from "../../../components/containers/Section";
import FlipCard from "../../../components/UI/FlipCard";
import styles from "./PlayerSection.module.css";
import PlayerCard from "../../../components/PlayerCard";
import DummyProfileImage from "../../../assets/messi.jpg";
import {LOREM_IPSUM} from "../../../constants/constants";
interface PlayerSectionProps {
    name: string;
}


const PlayerSection: React.FC<PlayerSectionProps> = ({name}) => {
    return (
        <Section name={name}>
            <div className={styles.cardGallery}>
                <PlayerCard name={"Messi"} image={DummyProfileImage} description={LOREM_IPSUM} />
                <PlayerCard name={"Messi"} image={DummyProfileImage} description={LOREM_IPSUM} />
                <PlayerCard name={"Messi"} image={DummyProfileImage} description={LOREM_IPSUM} />
                <PlayerCard name={"Messi"} image={DummyProfileImage} description={LOREM_IPSUM} />

            </div>

        </Section>
    );

}

export default PlayerSection;