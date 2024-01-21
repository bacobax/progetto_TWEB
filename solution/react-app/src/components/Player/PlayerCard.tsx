/**
 * Represents a Player card component.
 * @component
 */
import React from "react";
import {MilionFormat} from "../../constants/constants";
import {useNavigate} from "react-router-dom";
import {Card, Image, CardFooter, Button, CardBody} from "@nextui-org/react";
import {ShortPlayer} from "./types";
interface PlayerCardProps extends ShortPlayer {
  className?: string;
}

/**
 * PlayerCard is a functional component in React.
 * It accepts props of type PlayerCardProps which includes:
 * - first_name: A string representing the first name of the player.
 * - last_name: A string representing the last name of the player.
 * - _id: A string representing the ID of the player.
 * - image_url: A string representing the URL of the player's image.
 * - market_value_in_eur: A number representing the market value of the player in euros.
 * - highest_market_value_in_eur: A number representing the highest market value of the player in euros.
 *
 * The component uses the useNavigate hook from the react-router-dom library to get a function for navigating to different routes.
 *
 * The component returns a Card component from the @nextui-org/react library. The Card includes:
 * - A CardBody component with the player's name, market value, and image.
 * - A CardFooter component with a Button component. The Button navigates to the player's page when clicked.
 */
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
      <Card className="py-4 dark min-h-[200px] min-w-[200px]">

          <CardBody className="overflow-visible py-2 w-full gap-5 flex-row items-center">
              <div className={"w-1/2 self-start"}>
                  <p className="text-tiny uppercase font-bold">Players</p>
                  <small className="text-default-500">€ {MilionFormat(""+market_value_in_eur)}</small>
                  <h4 className="font-bold text-large">{first_name}{" "}{last_name}</h4>
              </div>

              <Image
                  alt="Card background"
                  className="object-cover rounded-xl z-0"
                  src={image_url}
                  height={200}
                  width={200}
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
