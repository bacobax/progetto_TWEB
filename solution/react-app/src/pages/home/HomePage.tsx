
import PlayerSection from "./sections/PlayerSection";
import TeamSection from "./sections/TeamSection";
import {HOME_SECTIONS} from "../../constants/constants";
import MainSection from "./sections/MainSection";
import {GlobalNavbar} from "../../components/common/navbar/GlobalNavbar";
/**
 * HomePage is a functional component in React.
 * It returns the JSX for the home page of the application.
 *
 * The home page consists of the following components:
 * - GlobalNavbar: This is the navigation bar that appears at the top of the page.
 * - div: This is a container div with Tailwind CSS classes for styling. It contains the following sections:
 *   - MainSection: This section displays the main content of the home page. The name prop is set to the name of the HOME section from the HOME_SECTIONS constant.
 *   - PlayerSection: This section displays the player-related content. The name prop is set to the name of the PLAYERS section from the HOME_SECTIONS constant.
 *   - TeamSection: This section displays the team-related content. The name prop is set to the name of the TEAMS section from the HOME_SECTIONS constant.
 */
function HomePage() {

    return (
        <>
            <GlobalNavbar />
            <div className="flex flex-col items-center">
                <MainSection name={HOME_SECTIONS.HOME.name} />
                <PlayerSection name={HOME_SECTIONS.PLAYERS.name}/>
                <TeamSection name={HOME_SECTIONS.TEAMS.name}/>
            </div>


        </>
    );
}

export default HomePage;
