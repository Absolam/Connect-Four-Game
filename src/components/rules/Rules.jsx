import styles from "./rules.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Rules = () => {
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);
  return (
    <div className={styles.rulesBg}>
      <div className={styles.rules}>
        <h2>RULES</h2>
        <div className={styles.rulesObjectives}>
          <h3>OBJECTIVE</h3>
          <p>
            Be the first player to connect 4 of the same colored discs in a row
            (either vertically, horizontally, or diagonally).
          </p>
        </div>
        <div className={styles.rulesHowToPlay}>
          <h3>HOW TO PLAY</h3>
          <div>
            <p>1</p>
            <p>Red goes first in the first game.</p>
          </div>
          <div>
            <p>2</p>
            <p>
              Players must alternate turns, and only one disc can be dropped in
              each turn.
            </p>
          </div>
          <div>
            <p>3</p>
            <p>The game ends when there is a 4-in-a-row or a stalemate.</p>
          </div>
          <div>
            <p>4</p>
            <p>
              The starter of the previous game goes second on the next game.
            </p>
          </div>
        </div>
        <Link to="/">
          <img
            className={styles.checkButton}
            src={hovered ? "images/icon-check.svg" : "images/icon-check.svg"}
            alt="confirm button"
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
          />
        </Link>
      </div>
    </div>
  );
};
