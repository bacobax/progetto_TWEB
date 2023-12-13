import React from 'react'
import Section from "../../../components/containers/Section";
import TeamCard from "../../../components/TeamCard";

import signalWindowSize from "../../../hooks/signalWindowSize";
import styles from "./TeamSection.module.css";
import {useSlice} from "../../../hooks/useSlice";
import {Pagination} from "@nextui-org/react";
import useLoadTeams from "../../../hooks/useLoadTeams";

interface TeamSectionProps {
    name: string;
}


const TeamSection: React.FC<TeamSectionProps> = ({name}) => {

    const {clubs, loading, error} = useLoadTeams()

    const { current, setIndex, matrixLength } = useSlice(clubs, signalWindowSize.value.isPhone ? 2: 3);

    return (
        <Section name={name} className={styles.teamsection}>
            <h1>{name} Section</h1>
            <div className={styles.gallery}>
                {
                    loading && <p>Loading...</p>
                }
                {
                    error && <p>{error}</p>
                }
                {
                    current.map((club) => (
                        <TeamCard key={club.clubId} {...club}/>
                    ))
                }
            </div>
            <Pagination className={`dark ${styles.pagination} cursor-pointer`} color="secondary" total={matrixLength} onChange={setIndex} />

        </Section>
    );

}

export default TeamSection;