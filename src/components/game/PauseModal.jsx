import styles from "./game.module.css";
import { Link } from "react-router-dom";

export const PauseModal = ({ setPause, resetGame }) => {
  const resetBoard = () => {
    resetGame();
    setPause(false);
  };
  return (
    <div className={styles.pause}>
      <h3>PAUSE</h3>
      <button onClick={() => setPause(false)}>CONTINUE GAME</button>
      <button onClick={resetBoard}>RESTART</button>
      <Link to="/">
        <button className={styles.pauseQuitGame}>QUIT GAME</button>
      </Link>
    </div>
  );
};
