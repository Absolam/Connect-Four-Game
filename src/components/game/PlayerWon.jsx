import styles from "./game.module.css";

export const PlayerWon = ({ win, reset }) => {
  return (
    <div className={styles.playerWon}>
      <p>{win.player === "TIE" ? "" : win.player.toUpperCase()}</p>
      <p>
        {win.player === "TIE" ? "TIE" : win.player === "YOU" ? "WIN" : "WINS"}
      </p>
      <button onClick={reset}>PLAY AGAIN</button>
    </div>
  );
};
