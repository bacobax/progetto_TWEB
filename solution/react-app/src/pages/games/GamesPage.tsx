import {FC} from "react";
import {Games} from "../../components/Game/Games";
import {GlobalNavbar} from "../../components/common/navbar/GlobalNavbar";

const GamesPage:FC = () => {
    return (
        <div className={"min-w-[100vw] flex flex-col items-center "}>
            <GlobalNavbar />
            <Games />
        </div>
    );
};

export default GamesPage;