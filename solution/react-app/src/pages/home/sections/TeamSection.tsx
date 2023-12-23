import React from 'react'
import Section from "../../../components/containers/Section";
import TeamCard from "../../../components/TeamCard";

import styles from "./TeamSection.module.css";
import {useSlice} from "../../../hooks/useSlice";
import {Divider, Pagination} from "@nextui-org/react";
import useLoadTeams from "../../../hooks/useLoadTeams";
import useWindowSize from "../../../hooks/useWindowSize";
import {animatedButtonProps} from "../../../constants/constants";
import Button from "../../../components/UI/button/Button";
import {useNavigate} from "react-router-dom";

interface TeamSectionProps {
    name: string;
}


const TeamSection: React.FC<TeamSectionProps> = ({name}) => {

    const {clubs, loading, error} = useLoadTeams(30)
    const {isPhone} = useWindowSize();
    const navigate = useNavigate();
    const { current, setIndex, matrixLength } = useSlice(clubs, isPhone ? 2: 3);

    return (
        <Section name={name} className={styles.teamsection}>
            <h1>{name} Section</h1>
            <div className={styles.gallery}>
                {
                    loading && <p>Loading...</p>
                }
                {
                    error && <p>{error.message}</p>
                }
                {
                    current.map((club) => (
                        <TeamCard key={club.clubId} {...club}/>
                    ))
                }
            </div>
            <Pagination className={`dark ${styles.pagination} cursor-pointer`} color="secondary" total={matrixLength} onChange={setIndex} />
            <Divider orientation={"horizontal"} className={"my-4"} />
            <Button {...animatedButtonProps} className={styles.moreButton} onClick={()=>{navigate("/gallery/clubs")}}>
                More
            </Button>
        </Section>
    );

}

export default TeamSection;