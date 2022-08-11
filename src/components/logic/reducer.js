function reducer(gameVariables, action) {
  switch (action.type) {
    case "playerOneScore":
      return {
        ...gameVariables,
        playerOneState: {
          ...gameVariables.playerOneState,
          score: gameVariables.playerOneState.score + 1,
        },
      };
    case "playerTwoScore":
      return {
        ...gameVariables,
        playerTwoState: {
          ...gameVariables.playerTwoState,
          score: gameVariables.playerTwoState.score + 1,
        },
      };
    case "playerOnePicks":
      return {
        ...gameVariables,
        playerOneState: {
          ...gameVariables.playerOneState,
          pick: action.data,
        },
      };
    case "playerTwoPicks":
      return {
        ...gameVariables,
        playerTwoState: {
          ...gameVariables.playerTwoState,
          pick: action.data,
        },
      };
    case "playerOneShow":
      return {
        ...gameVariables,
        playerOneState: {
          ...gameVariables.playerOneState,
          show: action.data,
        },
      };
    case "playerTwoShow":
      return {
        ...gameVariables,
        playerTwoState: {
          ...gameVariables.playerTwoState,
          show: action.data,
        },
      };
    case "gameOver":
      return {
        ...gameVariables,
        gameState: "gameOver",
      };
    case "thinking":
      return {
        ...gameVariables,
        gameState: "thinking",
      };
    case "results":
      return {
        ...gameVariables,
        gameState: "results",
      };
    case "loser":
      return { ...gameVariables, loser: action.data };
    case "winText":
      return { ...gameVariables, winText: action.data };
    case "iTDefault":
      return {
        ...gameVariables,
        innerText: {
          winningText: "Ready?",
          resultText: "Pick any symbol to start",
        },
      };
    case "iTP1":
      return {
        ...gameVariables,
        innerText: {
          winningText: "Player Wins!",
          resultText: `${gameVariables.playerOneState.pick} ${gameVariables.winText} ${gameVariables.playerTwoState.pick}!`,
        },
      };
    case "iTP2":
      return {
        ...gameVariables,
        innerText: {
          winningText: "Computer Wins!",
          resultText: `${gameVariables.playerTwoState.pick} ${gameVariables.winText} ${gameVariables.playerOneState.pick}!`,
        },
      };
    case "iTD":
      return {
        ...gameVariables,
        innerText: {
          winningText: "Draw!",
          resultText: "Face your opponent again!",
        },
      };
    case "iTAgain":
      return {
        ...gameVariables,
        innerText: {
          winningText: "Again?",
          resultText: "",
        },
      };
  }
}

export default reducer;
