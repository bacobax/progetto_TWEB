import React from 'react';
import {Card, CardHeader, Image, Divider, CardFooter, CardBody, Link, Button, Spacer} from "@nextui-org/react";
import {Club, ShortClub} from "../constants/types";
import {useNavigate} from "react-router-dom";
import {MilionFormat} from "../constants/constants";


interface TeamCardProps extends Club{

}

const onlyHostFromLink = (url: string) => {
    const urlObject = new URL(url);
    return urlObject.host;

}

/**
 * TeamCard component
 *
 * This is a functional component that displays a card with information about a team.
 *
 * @component
 * @param props - The properties passed to the component.
 * @param  props.name - The name of the team.
 * @param  props.clubId - The unique identifier of the club.
 * @param props.url - The URL of the team's website.
 *
 * @returns A card element with the team's information.
 */
const TeamCard: React.FC<TeamCardProps> = ({ name, clubId, url, totalMarketValue }) => {
  const navigate = useNavigate();

  return (
    <Card className="dark p-5">
      <CardHeader className="flex gap-3 p-0 w-full z-0">
        <div className="flex flex-col w-full">
          <p className="text-md  w-full">{name}</p>
          <p className="text-small text-default-500 w-full">{onlyHostFromLink(url)}</p>
        </div>
          <h2 className={"flex flex-row text-green-400 font-bold"}>{ "€" + MilionFormat(""+totalMarketValue)}</h2>
      </CardHeader>
      <Spacer y={2} />
      <Divider />
      <Spacer y={2} />
      <CardFooter className="flex-row gap-7 p-0 w-full z-0">
        <Link isExternal showAnchorIcon href={url}>
          Visit on
        </Link>
        <Button color="secondary" className="outline-0 border-0 dark" onClick={() => navigate(`/club/${clubId}`)}>
          View
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TeamCard;
