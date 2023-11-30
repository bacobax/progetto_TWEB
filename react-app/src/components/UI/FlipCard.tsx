import React from "react";
import styles from "./FlipCard.module.css";

interface FlipCardProps extends React.HTMLAttributes<HTMLElement> {
  front: React.ReactNode;
    back: React.ReactNode;
    className?: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ front, back, className, ...restProps }) => {
  return (
      <div className={`${styles["flip-card"]} ${className}`} {...restProps}>
          <div className={styles["flip-card-inner"]}>
              <div className={styles["flip-card-front"]}>
                  {front}
              </div>
              <div className={styles["flip-card-back"]}>
                  {back}
              </div>


          </div>
      </div>
  );
};

export default FlipCard;