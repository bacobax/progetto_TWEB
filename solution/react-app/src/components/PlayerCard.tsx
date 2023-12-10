/**
 * Represents a player card component.
 * @component
 */
import React, {useState} from "react";
import styles from "./PlayerCard.module.css";
import {ShortPlayer} from "../constants/types";
import {AnimatePresence, motion} from "framer-motion";
import {numberFormatWithCommas} from "../constants/constants";
import Button from "./UI/button/Button";
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
    const [isHovered, setIsHovered] = useState(false);
  return (
    <div className={styles.backdrop}>
      <motion.div
        className={styles.content}
      >
        <header>
          <img
            alt={(first_name ? first_name : "") + " " + (last_name ? last_name : "")}
            src={image_url}

          />
          <div
            className={styles.imgBackdrop}

          >
            <div className={styles.scoreSection}>
              <label>€ {numberFormatWithCommas(""+market_value_in_eur)}</label>
            </div>
          </div>
        </header>
        <main /*variants={{
            hover:{
                height: "100%",
                flexDirection: "column",
                alignItems: "center",
                color: "black",
                gap: "5rem"
            }}}*/>
          <label>{first_name} {last_name}</label>
                <div

                    className={styles.details}
                >

                    <Button animated={true} whileHover={{
                        scale: 1.1
                    }} className={styles.viewButton} style={{
                        border: "1px solid black"
                    }}>View</Button>
                </div>


        </main>
      </motion.div>
    </div>
  );
};

export default PlayerCard;
