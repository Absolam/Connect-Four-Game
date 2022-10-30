import { useState, useEffect } from "react";
import { Game } from "../Game";
import { winningSet } from "../winningSet";
import styles from "../game.module.css";

export const GameVsPlayer = () => {
  const [pause, setPause] = useState(false);
  const [timer, setTimer] = useState({ time: 30, turn: true });
  const [win, setWin] = useState({ state: false, player: "" });

  const [player1, setPlayer1] = useState({ name: "PLAYER 1", score: 0 });
  const [player2, setPlayer2] = useState({
    name: "PLAYER 2",
    score: 0,
  });

  useEffect(() => {
    let timerInterval = setInterval(() => {
      if (!pause) {
        setTimer((state) => ({ ...state, time: state.time - 1 }));
      }
      if (timer.time === 0) {
        clearInterval(timerInterval);
        setTimer((state) => ({ time: 30, turn: !state.turn }));
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer, pause]);

  const [trackCounters, setTrackCounters] = useState([
    { x: 7, y: 1, player: "player 0" },
    { x: 7, y: 2, player: "player 0" },
    { x: 7, y: 3, player: "player 0" },
    { x: 7, y: 4, player: "player 0" },
    { x: 7, y: 5, player: "player 0" },
    { x: 7, y: 6, player: "player 0" },
    { x: 7, y: 7, player: "player 0" },
  ]);
  const [playedCounters, setPlayedCounters] = useState([]);

  const checkColumn = (column) => {
    let filteredArr = trackCounters.filter((block) => block.y === column);
    let min = Math.min(...filteredArr.map((block) => block.x));
    if (min >= 2) {
      setPlayedCounters((prevstate) => [
        ...prevstate,
        <img
          key={`${column}${min - 1}`}
          className={styles.counterRed}
          style={{ gridColumn: column, gridRow: min - 1 }}
          src={
            timer.turn
              ? "images/counter-red-large.svg"
              : "images/counter-yellow-large.svg"
          }
          alt="counter"
        />,
      ]);
      setTrackCounters((prevstate) => [
        ...prevstate,
        { x: min - 1, y: column, player: timer.turn ? "player 1" : "player 2" },
      ]);
      setTimer((state) => ({ time: 30, turn: !state.turn }));
    }
  };

  const reset = () => {
    setTimer((state) => ({ time: 30, turn: !state.turn }));
    setTrackCounters([
      { x: 7, y: 1, player: "player 0" },
      { x: 7, y: 2, player: "player 0" },
      { x: 7, y: 3, player: "player 0" },
      { x: 7, y: 4, player: "player 0" },
      { x: 7, y: 5, player: "player 0" },
      { x: 7, y: 6, player: "player 0" },
      { x: 7, y: 7, player: "player 0" },
    ]);
    setPlayedCounters([]);
    setWin((prevState) => ({ state: false, player: "" }));
  };

  useEffect(() => {
    const checkWin = () => {
      for (let i = 0; i < winningSet.length; i++) {
        let result = [];
        trackCounters.forEach((obj) => {
          if (obj.x === winningSet[i][0].x && obj.y === winningSet[i][0].y) {
            result.push(obj);
          }
        });
        trackCounters.forEach((obj) => {
          if (obj.x === winningSet[i][1].x && obj.y === winningSet[i][1].y) {
            result.push(obj);
          }
        });
        trackCounters.forEach((obj) => {
          if (obj.x === winningSet[i][2].x && obj.y === winningSet[i][2].y) {
            result.push(obj);
          }
        });
        trackCounters.forEach((obj) => {
          if (obj.x === winningSet[i][3].x && obj.y === winningSet[i][3].y) {
            result.push(obj);
          }
        });
        if (
          result.length === 4 &&
          (result.every((r) => r.player === "player 1") ||
            result.every((r) => r.player === "player 2"))
        ) {
          if (result[0].player === "player 1") {
            setPlayer1((prevstate) => ({
              ...prevstate,
              score: prevstate.score + 1,
            }));
            setWin((prevState) => ({ state: true, player: "player 1" }));
          } else {
            setPlayer2((prevstate) => ({
              ...prevstate,
              score: prevstate.score + 1,
            }));
            setWin((prevState) => ({ state: true, player: "player 2" }));
          }
          break;
        } else result = [];
      }
    };
    checkWin();
  }, [trackCounters]);

  useEffect(() => {
    if (trackCounters.length === 49) {
      setWin({ state: true, player: "TIE" });
    }
  }, [trackCounters]);

  useEffect(() => {
    if (win.state) {
      document.documentElement.style.setProperty("--click", "none");
    } else document.documentElement.style.setProperty("--click", "auto");
  });

  return (
    <>
      <Game
        player1={player1}
        setPlayer1={setPlayer1}
        player2={player2}
        setPlayer2={setPlayer2}
        pause={pause}
        setPause={setPause}
        timer={timer}
        setTimer={setTimer}
        checkColumn={checkColumn}
        playedCounters={playedCounters}
        win={win}
        reset={reset}
      />
    </>
  );
};
