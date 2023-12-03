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
            <motion.div className={styles.content}
            variants={{
              hover:{
                scale: 1.2,
                backgroundColor: "var(--corvette)",

              }}}
            whileHover="hover"

            transition={{
                type: "spring",
                duration: 0.1
            }}
            >
              <header>

                <motion.img alt={name} src={image}
                  variants={{
                    hover:{
                      filter: "grayscale(100%)",
                      scale: 1.1,
                  }}}

                />
                <motion.div className={styles.imgBackdrop}
                variants={{
                    hover:{
                        scale: 1.1,
                    }
                }}
                >
                  <div className={styles.scoreSection}>
                    <h2>{generalScore}</h2>
                  </div>
                </motion.div>
              </header>
              <main>
                  <h3>{name}</h3>

              </main>


            </motion.div>
        </div>


  );
};


export default PlayerCard;