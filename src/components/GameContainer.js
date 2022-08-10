/** @format */

import data from "../data/data.json"
import React, { useState, useEffect } from "react"
import Coin from "./Coin"
import PlayerCard from "./PlayerCard"
import Lizard from "../images/Lizard.png"
import Paper from "../images/Paper.png"
import Rock from "../images/Rock.png"
import Scissors from "../images/Scissors.png"
import Spock from "../images/Spock.png"

function GameContainer() {
  const images = [Rock, Paper, Scissors, Lizard, Spock]
  const [populate, setPopulate] = useState(mergedData())
  const [gameState, setGameState] = useState("gameOver")
  const [containerGlow, setContainerGlow] = useState("")
  const [loser, setLoser] = useState("")
  const [winText, setWinText] = useState("")
  const [score, setScore] = useState({ playerOne: 0, playerTwo: 0 })
  const [picks, setPicks] = useState([
    { playerOnePick: "", show: false },
    { playerTwoPick: "", show: false },
  ])
  const [innerText, setInnerText] = useState({
    winningText: "Ready?",
    resultText: "Pick any symbol to start",
  })
  function mergedData() {
    const array = []
    data.map((x, i) => array.push({ ...x, image: images[i] }))
    return array
  }

  useEffect(() => {
    if (gameState === "gameOver") {
      setLoser("")
      setPicks([
        { playerOnePick: "", show: false },
        { playerTwoPick: "", show: false },
      ])
      if (score.playerOne > 0 || score.playerTwo > 0)
        setInnerText({
          winningText: "Again?",
        })
    } else if (gameState === "thinking") {
      setTimeout(() => {
        setGameState("results")
      }, 2000)
    } else if (gameState == "results") {
      setPicks([{ ...picks[0] }, { ...picks[1], show: true }])
      if (loser == picks[0].playerOnePick) {
        setScore({ ...score, playerTwo: score.playerTwo + 1 })
        setInnerText({
          winningText: "Computer Wins!",
          resultText: `${picks[1].playerTwoPick} ${winText} ${picks[0].playerOnePick}!`,
        })
      } else if (loser == picks[1].playerTwoPick) {
        setScore({ ...score, playerOne: score.playerOne + 1 })
        setInnerText({
          winningText: "Player Wins!",
          resultText: `${picks[0].playerOnePick} ${winText} ${picks[1].playerTwoPick}!`,
        })
      } else if (picks[1].playerTwoPick == picks[0].playerOnePick) {
        setInnerText({
          winningText: "Draw!",
          resultText: "Face your opponent again!",
        })
      }

      setTimeout(() => {
        setGameState("gameOver")
      }, 2000)
    }
  }, [gameState])

  useEffect(() => {
    if (picks[0].playerOnePick == "") {
      return
    } else if (picks[0].playerOnePick == picks[1].playerTwoPick) {
      setLoser("Draw!")
      return
    }
    for (let item of populate) {
      if (item.name === picks[1].playerTwoPick) {
        calculateResults(item, picks[0].playerOnePick)
      }
      if (item.name === picks[0].playerOnePick) {
        calculateResults(item, picks[1].playerTwoPick)
      }
    }
  }, [picks])

  useEffect(() => {
    if (loser === "Draw!") {
      setContainerGlow("gameContainerDraw")
    } else if (loser === picks[0].playerOnePick && loser !== "") {
      setContainerGlow("gameContainerP2")
    } else if (loser === picks[0].playerTwoPick && loser !== "") {
      setContainerGlow("gameContainerP1")
    } else setContainerGlow("")
  }, [gameState])

  function calculateResults(item, player) {
    for (let win of item.beats) {
      if (win.element === player) {
        setLoser(player)
        setWinText(win.text)
        // resultText.innerText = player != Player1Dom[0] ? `${Player1Dom[0]} ${win.text} ${Player2Dom[0]}` : `${Player2Dom[0]} ${win.text} ${Player1Dom[0]}`;
        // winner = player != Player1Dom[0] ? 1 : 2;
        return
      }
    }
  }

  function startGame(e) {
    setPicks([
      { playerOnePick: e.target.classList[0], show: true },
      {
        playerTwoPick: populate[Math.floor(Math.random() * populate.length)].name,
        show: false,
      },
    ])
    setGameState("thinking")
  }

  const coins = populate.map((x, i) => (
    <Coin
      key={i}
      name={x.name}
      beats={x.beats}
      image={x.image}
      onClick={startGame}
      playerOne={picks[0].playerOnePick}
      playerTwo={picks[1].playerTwoPick}
      gameState={gameState}
      loser={loser}
    />
  ))
  return (
    <div className={`GameContainer ${containerGlow}`}>
      <PlayerCard
        score={score.playerOne}
        player={"Player"}
        choice={picks[0].playerOnePick}
        show={picks[0].show}
      />

      <div className="CoinsContainer">{coins}</div>
      {gameState != "thinking" && (
        <div className="innerTextWrapper">
          <div className="winningText">{innerText.winningText}</div>
          <div className="resultText">{innerText.resultText}</div>
        </div>
      )}

      {gameState == "thinking" && (
        <div className="loadingWrapper">
          <div className="loading">
            <div></div>
            <div></div>
          </div>
          <div className="bigBrain">Computer is Thinking</div>
        </div>
      )}

      <PlayerCard
        score={score.playerTwo}
        player={"Computer"}
        choice={picks[1].playerTwoPick}
        show={picks[1].show}
      />
    </div>
  )
}

export default GameContainer
