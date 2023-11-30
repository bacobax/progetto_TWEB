import React from "react";
import styles from "./PlayerCard.module.css";
import FlipCard from "./UI/FlipCard";
import Button from "./UI/button/Button";
import NeuromorphismDiv from "./UI/NeuromorphismDiv";
import {Player} from "../constants/types";
import {stat} from "fs";
interface PlayerCardProps extends Player{
  className?: string;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  name,
  image,
  description,
  className,
    id,
    generalScore,
    statistics

}) => {



  return (

        <div className={styles.backdrop}>
            <div className={styles.content}>
              <header>

                <img alt={name} src={image}/>
                <div className={styles.imgBackdrop}>
                  <div className={styles.scoreSection}>
                    <h2>{generalScore}</h2>
                  </div>
                </div>

              </header>
              <main>
                  <h3>{name}</h3>

              </main>


            </div>
        </div>


  );
};


export default PlayerCard;