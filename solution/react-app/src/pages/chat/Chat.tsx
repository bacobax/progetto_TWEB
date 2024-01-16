import {FC} from "react";
import StatefulChat from "../../components/Chat/StatefulChat";
import {GlobalNavbar} from "../../components/common/navbar/GlobalNavbar";

const Chat: FC = () => {
    return (
        <div className={"flex flex-col w-full h-[100vh]"}>
            <GlobalNavbar />
            <StatefulChat />
        </div>
    )
}

export default Chat;