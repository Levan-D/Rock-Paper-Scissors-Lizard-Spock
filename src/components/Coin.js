/** @format */
import React, { useState, useEffect } from "react"

function Coin(props) {
  const [classes, setClasses] = useState("")
  useEffect(() => {
    if (props.gameState === "thinking" && props.name === props.playerOne) {
      setClasses("pulseClassBlue")
    }

    if (
      props.gameState === "results" &&
      props.loser === "Draw!" &&
      props.name === props.playerOne &&
      props.name === props.playerTwo
    ) {
      setClasses("pulseClassDraw")
    }

    if (
      props.gameState === "results" &&
      props.loser !== "Draw!" &&
      props.name !== props.loser &&
      props.name === props.playerOne
    ) {
      setClasses("winnerP1")
    } else if (
      props.gameState === "results" &&
      props.loser !== "Draw!" &&
      props.name === props.loser &&
      props.name === props.playerTwo
    ) {
      setClasses("loser")
    }

    if (
      props.gameState === "results" &&
      props.loser !== "Draw!" &&
      props.name !== props.loser &&
      props.name === props.playerTwo
    ) {
      setClasses("winnerP2")
    } else if (
      props.gameState === "results" &&
      props.loser !== "Draw!" &&
      props.name === props.loser &&
      props.name === props.playerOne
    ) {
      setClasses("loser")
    }

    if (
      props.gameState === "results" &&
      props.name !== props.playerTwo &&
      props.name !== props.playerOne
    ) {
      setClasses("dimmer")
    }

    if (props.gameState === "gameOver") {
      setClasses("")
    }
  }, [props.gameState])

  return (
    <div className="Coin">
      <div className="CoinWrapper">
        <img
          src={props.image}
          className={`${props.name} ${classes}`}
          onClick={props.gameState === "gameOver" ? props.onClick : null}
        />
      </div>
    </div>
  )
}

export default Coin
