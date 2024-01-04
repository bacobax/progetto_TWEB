import {FC} from "react";
import StatefulChat from "./StatefulChat";
import {MyBreadcrumbs} from "../../components/MyBreadcrumbs";
import {GlobalNavbar} from "../../components/navbar/GlobalNavbar";

const Chat: FC = () => {
    return (
        <div className={"flex flex-col w-full h-[100vh]"}>
            <GlobalNavbar />
            <StatefulChat />
        </div>
    )
}

export default Chat;