import styles from "./Background.module.css";
import CircleBackground from "./UI/animated/CircleBackground";

/**
 * Renders the background component.
 * @returns The rendered background component.
 */
const Background: React.FC = () => {
  return (
    <>
      <CircleBackground className={styles.circle} />
      <div className={styles.shape}></div>
      <div className={styles.overlay}></div>
    </>
  );
};

export default Background;
