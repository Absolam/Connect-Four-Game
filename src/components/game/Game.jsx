import { useState } from "react";
import { Board } from "./Board";
import styles from "./game.module.css";
import { Marker } from "./Marker";
import { PauseModal } from "./PauseModal";
import { PlayerTracker } from "./PlayerTracker";
import { Timer } from "./Timer";
import { PlayerWon } from "./PlayerWon";

export const Game = ({
  player1,
  setPlayer1,
  player2,
  setPlayer2,
  pause,
  setPause,
  timer,
  setTimer,
  playedCounters,
  checkColumn,
  checkWin,
  win,
  reset,
  resetGame,
}) => {
  const [columnHighlighted, setColumnHighlighted] = useState(1);
  const setColumn = (column) => {
    checkColumn(column);
  };
  const columnMarker = (column) => {
    setColumnHighlighted(column);
  };
  return (
    <div className={styles.gameBg}>
      <div className={styles.boardContainer}>
        <span
          className={styles.shadow}
          style={
            win.player === "player 1" || win.player === "YOU"
              ? { backgroundColor: "#fd6687" }
              : win.player === "player 2" || win.player === "CPU"
              ? { backgroundColor: "#ffce67" }
              : { backgroundColor: "#5c2dd5" }
          }
        ></span>
        <div className={styles.gameButtons}>
          <button onClick={() => setPause(true)}>MENU</button>
          <img src="/Connect-Four-Game/images/logo.svg" alt="logo" />
          <button onClick={resetGame}>RESTART</button>
        </div>
        <div className={styles.boardSubContainer}>
          <p
            onClick={() => {
              if (player1.name === "YOU") {
                timer.turn && setColumn(1);
              } else setColumn(1);
            }}
            onMouseOver={() => columnMarker(1)}
          ></p>
          <p
            onClick={() => {
              if (player1.name === "YOU") {
                timer.turn && setColumn(2);
              } else setColumn(2);
            }}
            onMouseOver={() => columnMarker(2)}
          ></p>
          <p
            onClick={() => {
              if (player1.name === "YOU") {
                timer.turn && setColumn(3);
              } else setColumn(3);
            }}
            onMouseOver={() => columnMarker(3)}
          ></p>
          <p
            onClick={() => {
              if (player1.name === "YOU") {
                timer.turn && setColumn(4);
              } else setColumn(4);
            }}
            onMouseOver={() => columnMarker(4)}
          ></p>
          <p
            onClick={() => {
              if (player1.name === "YOU") {
                timer.turn && setColumn(5);
              } else setColumn(5);
            }}
            onMouseOver={() => columnMarker(5)}
          ></p>
          <p
            onClick={() => {
              if (player1.name === "YOU") {
                timer.turn && setColumn(6);
              } else setColumn(6);
            }}
            onMouseOver={() => columnMarker(6)}
          ></p>
          <p
            onClick={() => {
              if (player1.name === "YOU") {
                timer.turn && setColumn(7);
              } else setColumn(7);
            }}
            onMouseOver={() => columnMarker(7)}
          ></p>
        </div>
        <div className={styles.boards}>
          {!win.state && (
            <Marker columnHighlighted={columnHighlighted} timer={timer} />
          )}
          <Board
            cl={styles.blackBoard}
            img="/Connect-Four-Game/images/board-layer-black-large.svg"
          />
          <Board
            cl={styles.whiteBoard}
            img="/Connect-Four-Game/images/board-layer-white-large.svg"
          />
          {playedCounters}
          {/* <img
            className={styles.counterRed}
            src="/Connect-Four-Game/images/counter-red-large.svg"
            alt="counter"
          /> */}
        </div>
        {win.state ? (
          <PlayerWon win={win} reset={reset} />
        ) : (
          <Timer
            pause={pause}
            timer={timer}
            setTimer={setTimer}
            img={
              timer.turn
                ? "/Connect-Four-Game/images/turn-background-red.svg"
                : "/Connect-Four-Game/images/turn-background-yellow.svg"
            }
            player1={player1}
            player2={player2}
          />
        )}
        <PlayerTracker
          cl={`${styles.tracker} ${styles.you}`}
          img={
            player1.name === "YOU"
              ? "/Connect-Four-Game/images/you.svg"
              : "/Connect-Four-Game/images/player-one.svg"
          }
          player={player1}
        />
        <PlayerTracker
          cl={`${styles.tracker} ${styles.cpu}`}
          img={
            player2.name === "CPU"
              ? "/Connect-Four-Game/images/cpu.svg"
              : "/Connect-Four-Game/images/player-two.svg"
          }
          player={player2}
        />
      </div>
      {pause ? (
        <>
          <PauseModal resetGame={resetGame} setPause={setPause} />
          <span
            onClick={() => setPause(false)}
            className={styles.overcast}
          ></span>
        </>
      ) : (
        ""
      )}
    </div>
  );
};
