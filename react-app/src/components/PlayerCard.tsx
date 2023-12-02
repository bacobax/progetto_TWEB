import React from "react";
import styles from "./PlayerCard.module.css";
import {Player} from "../constants/types";
import {motion} from "framer-motion";
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

        <div className={styles.backdrop}

          >
            <motion.div className={styles.content} whileHover={{
              scale: 1.2,
              backgroundColor: "var(--corvette)",

            }}
            onHoverStart={() => {}}
            onHoverEnd={() => {}}
            >
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


            </motion.div>
        </div>


  );
};


export default PlayerCard;