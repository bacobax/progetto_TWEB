import React from 'react';
import {Card, CardHeader, Divider, CardFooter, Link, Button, Spacer} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";
import {MilionFormat} from "../../constants/constants";
import {Club} from "./types";
import {motion} from "framer-motion";


interface TeamCardProps extends Club{

}

const onlyHostFromLink = (url: string) => {
    const urlObject = new URL(url);
    return urlObject.host;

}

const AnimatedCard = motion(Card);
/**
 * TeamCard component
 *
 * This is a functional component that displays a card with information about a team.
 *
 * @component
 * @param props - The properties passed to the component.
 * @param  props.name - The name of the team.
 * @param  props.clubId - The unique identifier of the Club.
 * @param props.url - The URL of the team's website.
 *
 * @returns A card element with the team's information.
 */
const TeamCard: React.FC<TeamCardProps> = ({ name, clubId, url, totalMarketValue }) => {
  const navigate = useNavigate();
  const variants = {
      hover: {
          backgroundColor: "#292929",
          y: -20,
      }
  }

  const handleOpenClub = () => navigate(`/club/${clubId}`);

  return (
      <motion.div variants={variants} whileHover={"hover"} className={"cursor-pointer rounded-md"} onClick={handleOpenClub}>
          <Card className="dark p-5 flex flex-col justify-around bg-transparent rounded-md w-full h-full" >
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
              <CardFooter className="flex-row gap-7 p-0 w-full z-0 items-center justify-around">
                  <Link isExternal showAnchorIcon href={url}>
                      Visit on
                  </Link>
                  <Button color="secondary" className="outline-0 border-0 dark" onClick={handleOpenClub}>
                      View
                  </Button>
              </CardFooter>
          </Card>
      </motion.div>

  );
};

export default TeamCard;
