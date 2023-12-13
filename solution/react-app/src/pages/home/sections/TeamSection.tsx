import React, {useEffect} from 'react'
import Section from "../../../components/containers/Section";
import TeamCard from "../../../components/TeamCard";
import useSignalFetch from "../../../hooks/signalFetch";
import {URL_SHORT_TEAMS} from "../../../constants/constants";
import {Club, ShortClub} from "../../../constants/types";
import {useSignal} from "@preact/signals-react";
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

    const { current, setIndex, matrixLength } = useSlice(clubs.value, signalWindowSize.value.isPhone ? 2: 3);

    return (
        <Section name={name} className={styles.teamsection}>
            <h1>{name} Section</h1>
            <div className={styles.gallery}>
                {
                    loading.value && <p>Loading...</p>
                }
                {
                    error.value && <p>{error.value}</p>
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