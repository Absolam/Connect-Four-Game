import { useState, useEffect } from "react";
import { Game } from "../Game";
import styles from "../game.module.css";
import { winningSet } from "../winningSet";

export const GameVsCPU = () => {
  const [pause, setPause] = useState(false);
  const [timer, setTimer] = useState({ time: 30, turn: true });
  const [win, setWin] = useState({ state: false, player: "" });

  const [player1, setPlayer1] = useState({ name: "YOU", score: 0 });
  const [player2, setPlayer2] = useState({
    name: "CPU",
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

  const fallAnimation = (row) => {
    switch (row) {
      case 7:
        return styles.fall6;
      case 6:
        return styles.fall6;
      case 5:
        return styles.fall5;
      case 4:
        return styles.fall4;
      case 3:
        return styles.fall3;
      case 2:
        return styles.fall2;
      case 1:
        return styles.fall1;
      default:
        return styles.fall1;
    }
  };

  const checkColumn = (column) => {
    let filteredArr = trackCounters.filter((block) => block.y === column);
    let min = Math.min(...filteredArr.map((o) => o.x));
    if (min >= 1) {
      setPlayedCounters((prevstate) => [
        ...prevstate,
        <img
          key={`${column}${min - 1}`}
          className={`${styles.counterRed} ${fallAnimation(min)}`}
          style={{ gridColumn: column, gridRow: min - 1 }}
          src={
            timer.turn
              ? "/Connect-Four-Game/images/counter-red-large.svg"
              : "/Connect-Four-Game/images/counter-yellow-large.svg"
          }
          alt="counter"
        />,
      ]);
      setTrackCounters((prevstate) => [
        ...prevstate,
        { x: min - 1, y: column, player: timer.turn ? "YOU" : "CPU" },
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

  const resetGame = () => {
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
    setPlayer1((prevState) => ({ ...prevState, score: 0 }));
    setPlayer2((prevState) => ({ ...prevState, score: 0 }));
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
          (result.every((r) => r.player === "YOU") ||
            result.every((r) => r.player === "CPU"))
        ) {
          if (result[0].player === "YOU") {
            setPlayer1((prevstate) => ({
              ...prevstate,
              score: prevstate.score + 1,
            }));
            setWin((prevState) => ({ state: true, player: "YOU" }));
          } else {
            setPlayer2((prevstate) => ({
              ...prevstate,
              score: prevstate.score + 1,
            }));
            setWin((prevState) => ({ state: true, player: "CPU" }));
          }
          break;
        } else result = [];
      }
    };
    if (win.state === false) {
      checkWin();
    }
  }, [trackCounters, win.state]);

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

  useEffect(() => {
    if (!timer.turn) {
      const runCPU = () => {
        const getRandomPair = () => {
          let column = Math.floor(Math.random() * (7 - 1 + 1) + 1);
          let filteredArr = trackCounters.filter((block) => block.y === column);
          let min = Math.min(...filteredArr.map((o) => o.x));
          if (min <= 1) {
            runCPU();
          } else return [min, column];
        };

        const [min, column] = getRandomPair();
        if (!win.state) {
          setPlayedCounters((prevstate) => [
            ...prevstate,
            <img
              key={`${column}${min - 1}`}
              className={`${styles.counterRed} ${fallAnimation(min)}`}
              style={{ gridColumn: column, gridRow: min - 1 }}
              src={
                timer.turn
                  ? "/Connect-Four-Game/images/counter-red-large.svg"
                  : "/Connect-Four-Game/images/counter-yellow-large.svg"
              }
              alt="counter"
            />,
          ]);
        }
        setTrackCounters((prevstate) => [
          ...prevstate,
          { x: min - 1, y: column, player: timer.turn ? "YOU" : "CPU" },
        ]);
        setTimer((state) => ({ time: 30, turn: !state.turn }));
      };
      setTimeout(() => {
        runCPU();
      }, 800);
    }
  }, [trackCounters, timer.turn, win.state]);

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
        resetGame={resetGame}
      />
    </>
  );
};
