import React from 'react'
import Section from "../../../components/containers/Section";


interface TeamSectionProps {
    name: string;
}


const TeamSection: React.FC<TeamSectionProps> = ({name}) => {
    return (
        <Section name={name}>
            <h1>{name} Section</h1>
        </Section>
    );

}

export default TeamSection;