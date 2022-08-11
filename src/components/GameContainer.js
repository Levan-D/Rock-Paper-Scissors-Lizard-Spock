/** @format */

import data from "../data/data.json";
import React, { useState, useEffect, useReducer } from "react";
import reducer from "./logic/reducer";
import ACTIONS from "./logic/ACTIONS";
import Coin from "./Coin";
import PlayerCard from "./PlayerCard";
import Lizard from "../images/Lizard.png";
import Paper from "../images/Paper.png";
import Rock from "../images/Rock.png";
import Scissors from "../images/Scissors.png";
import Spock from "../images/Spock.png";

function GameContainer() {
  const images = [Rock, Paper, Scissors, Lizard, Spock];
  const [populate, setPopulate] = useState(mergedData());
  const [containerGlow, setContainerGlow] = useState("gameContainerDefault");
  const [gameVariables, dispatch] = useReducer(reducer, {
    gameState: "gameOver",
    loser: "",
    winText: "",
    playerOneState: { pick: "", show: false, score: 0 },
    playerTwoState: { pick: "", show: false, score: 0 },
    innerText: {
      winningText: "Ready?",
      resultText: "Pick any symbol to start",
    },
  });

  function mergedData() {
    const array = [];
    data.map((x, i) => array.push({ ...x, image: images[i] }));
    return array;
  }

  useEffect(() => {
    if (gameVariables.gameState === "gameOver") {
      dispatch({
        type: ACTIONS.PLAYERONEPICKS,
        data: "",
      });
      dispatch({
        type: ACTIONS.PLAYERTWOPICKS,
        data: "",
      });
      dispatch({
        type: ACTIONS.PLAYERONESHOW,
        data: false,
      });
      dispatch({
        type: ACTIONS.PLAYERTWOSHOW,
        data: false,
      });
      if (
        gameVariables.playerOneState.score > 0 ||
        gameVariables.playerTwoState.score > 0
      )
        dispatch({ type: ACTIONS.ITAGAIN });
    } else if (gameVariables.gameState === "thinking") {
      setTimeout(() => {
        dispatch({ type: ACTIONS.RESULTS });
      }, 2000);
    } else if (gameVariables.gameState == "results") {
      dispatch({
        type: ACTIONS.PLAYERTWOSHOW,
        data: true,
      });

      if (gameVariables.loser === gameVariables.playerOneState.pick) {
        dispatch({ type: ACTIONS.PLAYERTWOSCORE });
        dispatch({ type: ACTIONS.ITP2 });
      } else if (gameVariables.loser === gameVariables.playerTwoState.pick) {
        dispatch({ type: ACTIONS.PLAYERONESCORE });
        dispatch({ type: ACTIONS.ITP1 });
      } else if (
        gameVariables.playerTwoState.pick === gameVariables.playerOneState.pick
      ) {
        dispatch({ type: ACTIONS.ITD });
      }

      setTimeout(() => {
        dispatch({ type: ACTIONS.GAMEOVER });
      }, 2000);
    }
  }, [gameVariables.gameState]);

  useEffect(() => {
    if (gameVariables.playerOneState.pick === "") {
      return;
    } else if (
      gameVariables.playerOneState.pick === gameVariables.playerTwoState.pick
    ) {
      dispatch({ type: ACTIONS.LOSER, data: "Draw!" });
      return;
    }
    for (let item of populate) {
      if (item.name === gameVariables.playerTwoState.pick) {
        calculateResults(item, gameVariables.playerOneState.pick);
      }
      if (item.name === gameVariables.playerOneState.pick) {
        calculateResults(item, gameVariables.playerTwoState.pick);
      }
    }
  }, [gameVariables.playerOneState, gameVariables.playerTwoState]);

  function calculateResults(item, player) {
    for (let win of item.beats) {
      if (win.element === player) {
        dispatch({ type: ACTIONS.LOSER, data: player });

        dispatch({
          type: ACTIONS.WINTEXT,
          data: win.text,
        });
        return;
      }
    }
  }

  useEffect(() => {
    if (
      gameVariables.gameState === "gameOver" ||
      gameVariables.gameState === "thinking"
    ) {
      setContainerGlow("gameContainerDefault");
    } else if (
      gameVariables.loser === "Draw!" &&
      gameVariables.gameState === "results"
    ) {
      setContainerGlow("gameContainerDraw");
    } else if (
      gameVariables.loser === gameVariables.playerOneState.pick &&
      gameVariables.loser !== "" &&
      gameVariables.gameState === "results"
    ) {
      setContainerGlow("gameContainerP2");
    } else if (
      gameVariables.loser === gameVariables.playerTwoState.pick &&
      gameVariables.loser !== "" &&
      gameVariables.gameState === "results"
    ) {
      setContainerGlow("gameContainerP1");
    }
  }, [gameVariables.gameState]);

  function startGame(e) {
    dispatch({
      type: ACTIONS.PLAYERONEPICKS,
      data: e.target.classList[0],
    });
    dispatch({
      type: ACTIONS.PLAYERTWOPICKS,
      data: populate[Math.floor(Math.random() * populate.length)].name,
    });

    dispatch({
      type: ACTIONS.PLAYERONESHOW,
      data: true,
    });
    dispatch({
      type: ACTIONS.PLAYERTWOSHOW,
      data: false,
    });
    dispatch({ type: ACTIONS.THINKING });
  }

  const coins = populate.map((x, i) => (
    <Coin
      key={i}
      name={x.name}
      beats={x.beats}
      image={x.image}
      onClick={startGame}
      playerOne={gameVariables.playerOneState.pick}
      playerTwo={gameVariables.playerTwoState.pick}
      gameState={gameVariables.gameState}
      loser={gameVariables.loser}
    />
  ));
  console.log(gameVariables.playerOneState.show);
  return (
    <div className={`GameContainer ${containerGlow}`}>
      <PlayerCard
        score={gameVariables.playerOneState.score}
        player={"Player"}
        choice={gameVariables.playerOneState.pick}
        show={gameVariables.playerOneState.show}
      />

      <div className="CoinsContainer">{coins}</div>
      {gameVariables.gameState != "thinking" && (
        <div className="innerTextWrapper">
          <div className="winningText">
            {gameVariables.innerText.winningText}
          </div>
          <div className="resultText">{gameVariables.innerText.resultText}</div>
        </div>
      )}

      {gameVariables.gameState === "thinking" && (
        <div className="loadingWrapper">
          <div className="loading">
            <div></div>
            <div></div>
          </div>
          <div className="bigBrain">Computer is Thinking</div>
        </div>
      )}

      <PlayerCard
        score={gameVariables.playerTwoState.score}
        player={"Computer"}
        choice={gameVariables.playerTwoState.pick}
        show={gameVariables.playerTwoState.show}
      />
    </div>
  );
}

export default GameContainer;
