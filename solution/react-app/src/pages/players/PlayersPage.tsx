import {FC} from "react";
import {GlobalNavbar} from "../../components/common/navbar/GlobalNavbar";
import {Players} from "../../components/Player/Players";

/**
 * PlayersPage is a functional component in React.
 * It does not accept any props.
 *
 * The component returns a div element styled with Tailwind CSS classes. The div includes:
 * - A GlobalNavbar component for displaying the global navigation bar.
 * - A Players component for displaying the players.
 *
 * The div is styled to fill the viewport width and align its children in a column in the center.
 */
const PlayersPage:FC = () => {
    return (
        <div className={"min-w-[100vw] flex flex-col items-center "}>
            <GlobalNavbar />
            <Players />
        </div>
    );
};
export default PlayersPage;