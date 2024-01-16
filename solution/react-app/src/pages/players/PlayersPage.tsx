import {FC} from "react";
import {GlobalNavbar} from "../../components/common/navbar/GlobalNavbar";
import {Players} from "../../components/Player/Players";

const PlayersPage:FC = () => {
    return (
        <div className={"min-w-[100vw] flex flex-col items-center "}>
            <GlobalNavbar />
            <Players />
        </div>
    );
};

export default PlayersPage;