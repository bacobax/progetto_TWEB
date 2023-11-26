import React from "react";
import styles from "./PlayerCard.module.css";
import FlipCard from "./UI/FlipCard";
interface PlayerCardProps {
  name: string;
  image: string;
  description: string;
  className?: string;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  name,
  image,
  description,
  className,
  ...restProps
}) => {

    const front = (
        <div className={styles.front}>
            <img src={image} alt={"profile"} style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
            }} loading="lazy"/>
            <div className={styles.overlay}>
                <h1>{name}</h1>
            </div>
        </div>
    )

    const back = (
        <div className={styles.back}>
            <p style={{
                margin: 0
            }}>{description}</p>
        </div>
    )

  return (
    <FlipCard front={front} back={back} className={styles.card}/>
  );
};


export default PlayerCard;