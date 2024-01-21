import {FC} from "react";
import StatefulChat from "../../components/Chat/StatefulChat";
import {GlobalNavbar} from "../../components/common/navbar/GlobalNavbar";

/**
 * Chat is a functional component in React.
 * It does not accept any props.
 *
 * The component returns a fragment containing the following children:
 * - A GlobalNavbar component for displaying the global navigation bar.
 * - A div element styled with Tailwind CSS classes. The div includes:
 *   - A StatefulChat component for displaying the chat interface.
 *
 * The GlobalNavbar component is always displayed at the top of the page.
 * The StatefulChat component is wrapped in a div that fills the viewport height and is styled to display its children in a column.
 */
const Chat: FC = () => {
    return (
        <>
            <GlobalNavbar />

            <div className={"flex flex-col w-full h-[100vh]"}>
                <StatefulChat />
            </div>
        </>

    )
}

export default Chat;