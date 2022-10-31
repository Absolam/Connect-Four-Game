import styles from "./menu.module.css";
import { Link } from "react-router-dom";

export const Menu = () => {
  return (
    <div className={styles.menuBg}>
      <div className={styles.menu}>
        <img src="/Connect-Four-Game/images/logo.svg" alt="logo" />
        <Link to="/vsCPU">
          <h2>PLAY VS CPU</h2>
          <img
            src="/Connect-Four-Game/images/player-vs-cpu.svg"
            alt="player vs cpu logo"
          />
        </Link>
        <Link to="/vsPlayer">
          <h2>PLAY VS PLAYER</h2>
          <img
            src="/Connect-Four-Game/images/player-vs-player.svg"
            alt="player vs player logo"
          />
        </Link>
        <Link to="/rules">
          <h2>GAME RULES</h2>
        </Link>
      </div>
    </div>
  );
};
