import React from 'react'
import Section from "../../../components/common/containers/Section";
import TeamCard from "../../../components/Club/TeamCard";

import {useSlice} from "../../../hooks/useSlice";
import {Button, Divider, Pagination} from "@nextui-org/react";
import useLoadTeams from "../../../hooks/useLoadTeams";
import useWindowSize from "../../../hooks/useWindowSize";
import { ROUTES} from "../../../constants/constants";
import {useNavigate} from "react-router-dom";
import {MdKeyboardDoubleArrowUp} from "react-icons/md";
interface TeamSectionProps {
    name: string;
}


const TeamSection: React.FC<TeamSectionProps> = ({name}) => {

    const {clubs, loading, error} = useLoadTeams(30)
    const {isPhone} = useWindowSize();
    const navigate = useNavigate();
    const { current, setIndex, matrixLength } = useSlice(clubs, isPhone ? 2: 3);

    return (
        <Section name={name} className={"flex flex-col gap-16"}>
            <h1 className={"text-5xl text-corvette"}>{name} Section</h1>
            <div className={"text-green-400 flex items-center text-xl font-bold"}>
                <MdKeyboardDoubleArrowUp />
                <h3> Market Value (eur)</h3>
            </div>
            <div className={"flex justify-around items-center w-full flex-wrap gap-5"}>
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
            <Pagination className={`dark cursor-pointer`} color="secondary" total={matrixLength} onChange={(index)=>setIndex(index-1)} />
            <Divider orientation={"horizontal"} className={"my-4"} />
            <Button onClick={()=>{navigate(ROUTES.CLUBS)}} className={"bg-corvette"} size={"lg"}>
                More
            </Button>
        </Section>
    );

}

export default TeamSection;