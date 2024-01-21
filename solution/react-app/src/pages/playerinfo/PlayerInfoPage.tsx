import {FC} from "react";
import {useParams} from "react-router-dom";
import {PlayerInfo} from "../../components/Player/PlayerInfo";


/**
 * PlayerInfoPage is a functional component in React.
 * It does not accept any props.
 *
 * The component uses the useParams hook from the react-router-dom library to get the parameters from the current route.
 * The id parameter is destructured from the params object.
 *
 * If the id parameter is present, the component returns a div element styled with Tailwind CSS classes. The div includes:
 * - A PlayerInfo component. The PlayerInfo component is passed the id prop.
 *
 * If the id parameter is not present, the component returns null.
 */
const PlayerInfoPage:FC = () => {
    const params = useParams();

    const {id} = params;

    if(id){
        return (
            <div className={"w-[100vw] flex items-center justify-center p-[20px]"}>
                <PlayerInfo id={id}/>
            </div>
        );
    }else{
        return null;
    }

};
export default PlayerInfoPage;