import styles from "./game.module.css";

export const Timer = ({ img, timer, player1, player2 }) => {
  const identifyPlayer = () => {
    if (timer.turn) {
      if (player1.name === "YOU") {
        return `${player1.name}R TURN`;
      } else return `${player1.name}'S TURN`;
    } else if (!timer.turn) {
      return `${player2.name}'S TURN`;
    }
  };
  return (
    <div
      className={styles.timer}
      style={timer.turn ? { color: "#fff" } : { color: "#000" }}
    >
      <img src={img} alt="timer" />
      <p>{identifyPlayer()}</p>
      <p>{`${timer.time}s`}</p>
    </div>
  );
};
