import {FC} from "react";
import {Games} from "./Games";

const GamesPage:FC = () => {
    return (
        <div className={"min-w-[100vw] flex items-center justify-center p-[20px]"}>
            <Games />
        </div>
    );
};

export default GamesPage;