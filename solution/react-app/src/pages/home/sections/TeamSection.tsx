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


/**
 * TeamSection is a functional component in React.
 * It accepts props of type TeamSectionProps which includes:
 * - name: A string representing the name of the section.
 *
 * The component maintains several state variables:
 * - clubs, loading, error: The state and functions returned from the useLoadTeams custom hook.
 * - isPhone: A boolean indicating whether the user is on a phone, retrieved from the useWindowSize hook.
 * - navigate: A function for navigating to different routes, retrieved from the useNavigate hook.
 * - current, setIndex, matrixLength: The state and functions returned from the useSlice hook.
 *
 * The component returns a Section component with the following children:
 * - A h1 element displaying the name of the section.
 * - A div element displaying the market value label and an arrow icon.
 * - A div element displaying a list of TeamCard components for the clubs. If the clubs are still loading, a loading message is displayed. If there is an error fetching the clubs, an error message is displayed.
 * - A Pagination component for navigating between pages of clubs.
 * - A Divider component.
 * - A Button component for navigating to the clubs page.
 */
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