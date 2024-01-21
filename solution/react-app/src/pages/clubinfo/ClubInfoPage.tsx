import {FC} from "react";
import {ClubInfo} from "../../components/Club/ClubInfo";
import {Navigate, useParams} from "react-router-dom";



/**
 * ClubInfoPage is a functional component in React.
 * It does not accept any props.
 *
 * The component uses the useParams hook from the react-router-dom library to get the parameters from the current route.
 * The id parameter is destructured from the params object.
 *
 * The component returns a div element styled with Tailwind CSS classes. The div includes:
 * - A ClubInfo component if the id parameter is present. The ClubInfo component is passed the id prop.
 * - A Navigate component if the id parameter is not present. The Navigate component redirects to the root route ("/").
 */
const ClubInfoPage:FC = () => {

    const params = useParams();

    const {id} = params;

    return (
        <div className={"min-w-[100vw] flex items-center justify-center p-[20px]"}>
            {id && <ClubInfo id={id}/>}
            {!id && <Navigate to={"/"}/>}
        </div>
    );
};


export default ClubInfoPage;