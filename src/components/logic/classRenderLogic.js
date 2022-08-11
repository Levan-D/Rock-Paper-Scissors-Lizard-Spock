function classRenderLogic(props, setClasses) {
  if (props.gameState === "thinking" && props.name === props.playerOne) {
    setClasses("pulseClassBlue");
  }

  if (
    props.gameState === "results" &&
    props.loser === "Draw!" &&
    props.name === props.playerOne &&
    props.name === props.playerTwo
  ) {
    setClasses("pulseClassDraw");
  }

  if (
    props.gameState === "results" &&
    props.loser !== "Draw!" &&
    props.name !== props.loser &&
    props.name === props.playerOne
  ) {
    setClasses("winnerP1");
  } else if (
    props.gameState === "results" &&
    props.loser !== "Draw!" &&
    props.name === props.loser &&
    props.name === props.playerTwo
  ) {
    setClasses("loser");
  }

  if (
    props.gameState === "results" &&
    props.loser !== "Draw!" &&
    props.name !== props.loser &&
    props.name === props.playerTwo
  ) {
    setClasses("winnerP2");
  } else if (
    props.gameState === "results" &&
    props.loser !== "Draw!" &&
    props.name === props.loser &&
    props.name === props.playerOne
  ) {
    setClasses("loser");
  }

  if (
    props.gameState === "results" &&
    props.name !== props.playerTwo &&
    props.name !== props.playerOne
  ) {
    setClasses("dimmer");
  }

  if (props.gameState === "gameOver") {
    setClasses("");
  }
}

export default classRenderLogic;
