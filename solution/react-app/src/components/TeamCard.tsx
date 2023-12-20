import {Card, CardHeader, Image, Divider, CardFooter, CardBody, Link, Button, Spacer} from "@nextui-org/react";
import {Club, ShortClub, ShortPlayer} from "../constants/types";
import {useNavigate} from "react-router-dom";


interface TeamCardProps extends ShortClub{
}

const onlyHostFromLink = (url: string) => {
    const urlObject = new URL(url);
    return urlObject.host;

}

const TeamCard: React.FC<TeamCardProps> = ({name,stadiumName, lastSeason, squadSize, clubId , url}) => {
    const navigate = useNavigate();

    return (
        <Card className="dark p-5">
            <CardHeader className="flex gap-3 p-0 w-full" >

                <div className="flex flex-col w-full">
                    <p className="text-md  w-full">{name}</p>
                    <p className="text-small text-default-500 w-full">{onlyHostFromLink(url)}</p>
                </div>
            </CardHeader>
            <Spacer y={2}/>
            <Divider/>
            <Spacer y={2}/>
            <CardFooter className="flex-row gap-7 p-0 w-full">
                <Link
                    isExternal
                    showAnchorIcon
                    href={url}
                >
                    Visit on
                </Link>
                <Button color="secondary" className="outline-0 border-0">View</Button>
            </CardFooter>
        </Card>
    );
}

export default TeamCard;