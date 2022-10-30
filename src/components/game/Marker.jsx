import styles from "./game.module.css";

export const Marker = ({ timer, columnHighlighted }) => {
  return (
    <>
      <img
        className={styles.marker}
        style={{ left: `${2.148 * (columnHighlighted * 2) - 1.709}vw` }}
        // style={{ left: `${44 * (columnHighlighted * 2) - 35}px` }}
        src={timer.turn ? "images/marker-red.svg" : "images/marker-yellow.svg"}
        alt="turn marker"
      />
    </>
  );
};
