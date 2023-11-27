import React from "react";
import styles from "./PlayerCard.module.css";
import FlipCard from "./UI/FlipCard";
import Button from "./UI/button/Button";
interface PlayerCardProps {
  name: string;
  image: string;
  description: string;
  className?: string;
  id: number | string;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  name,
  image,
  description,
  className,
    id,

}) => {

    const front = (
        <div className={styles.front}>
            <img src={image} alt={"profile"} style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px"
            }} loading="lazy"/>
            <div className={styles.overlay}>
                <h2>{name}</h2>
            </div>
        </div>
    )

    const back = (
        <div className={styles.back}>
            <h3>Description</h3>
            <p className={styles.description}>{description}</p>
            <Button className={styles.moreButton}>More</Button>
        </div>
    )

  return (
    <FlipCard front={front} back={back} className={styles.card}/>
  );
};


export default PlayerCard;