/**
 * Represents a player card component.
 * @component
 */
import React from "react";
import {ShortPlayer} from "../constants/types";
import {MilionFormat} from "../constants/constants";
import {useNavigate} from "react-router-dom";
import {Card, Image, CardFooter, Button, CardBody} from "@nextui-org/react";
interface PlayerCardProps extends ShortPlayer {
  className?: string;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  first_name,
    last_name,
    _id,
    image_url,
    market_value_in_eur,
    highest_market_value_in_eur

}) => {
    const navigate = useNavigate()
  return (
      <Card className="py-4 dark min-h-[200px]">

          <CardBody className="overflow-visible py-2 w-full gap-2 flex-row ">
              <div>
                  <p className="text-tiny uppercase font-bold">Players</p>
                  <small className="text-default-500">€ {MilionFormat(""+market_value_in_eur)}</small>
                  <h4 className="font-bold text-large">{first_name}{" "}{last_name}</h4>
              </div>

              <Image
                  alt="Card background"
                  className="object-cover rounded-xl z-0"
                  src={image_url}
                  height={100}
                  width={100}
              />
          </CardBody>
          <CardFooter>
              <Button className={"w-full"} color={"default"} variant={"solid"} onClick={()=>{navigate(`/player/${_id}`)}}>
                  More
              </Button>
          </CardFooter>
      </Card>
  );
};

export default PlayerCard;
