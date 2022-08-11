import ACTIONS from "./ACTIONS";

function reducer(gameVariables, action) {
  switch (action.type) {
    case ACTIONS.PLAYERONESCORE:
      return {
        ...gameVariables,
        playerOneState: {
          ...gameVariables.playerOneState,
          score: gameVariables.playerOneState.score + 1,
        },
      };
    case ACTIONS.PLAYERTWOSCORE:
      return {
        ...gameVariables,
        playerTwoState: {
          ...gameVariables.playerTwoState,
          score: gameVariables.playerTwoState.score + 1,
        },
      };
    case ACTIONS.PLAYERONEPICKS:
      return {
        ...gameVariables,
        playerOneState: {
          ...gameVariables.playerOneState,
          pick: action.data,
        },
      };
    case ACTIONS.PLAYERTWOPICKS:
      return {
        ...gameVariables,
        playerTwoState: {
          ...gameVariables.playerTwoState,
          pick: action.data,
        },
      };
    case ACTIONS.PLAYERONESHOW:
      return {
        ...gameVariables,
        playerOneState: {
          ...gameVariables.playerOneState,
          show: action.data,
        },
      };
    case ACTIONS.PLAYERTWOSHOW:
      return {
        ...gameVariables,
        playerTwoState: {
          ...gameVariables.playerTwoState,
          show: action.data,
        },
      };
    case ACTIONS.GAMEOVER:
      return {
        ...gameVariables,
        gameState: "gameOver",
      };
    case ACTIONS.THINKING:
      return {
        ...gameVariables,
        gameState: "thinking",
      };
    case ACTIONS.RESULTS:
      return {
        ...gameVariables,
        gameState: "results",
      };
    case ACTIONS.LOSER:
      return { ...gameVariables, loser: action.data };
    case ACTIONS.WINTEXT:
      return { ...gameVariables, winText: action.data };
    case ACTIONS.ITDEFAULT:
      return {
        ...gameVariables,
        innerText: {
          winningText: "Ready?",
          resultText: "Pick any symbol to start",
        },
      };
    case ACTIONS.ITP1:
      return {
        ...gameVariables,
        innerText: {
          winningText: "Player Wins!",
          resultText: `${gameVariables.playerOneState.pick} ${gameVariables.winText} ${gameVariables.playerTwoState.pick}!`,
        },
      };
    case ACTIONS.ITP2:
      return {
        ...gameVariables,
        innerText: {
          winningText: "Computer Wins!",
          resultText: `${gameVariables.playerTwoState.pick} ${gameVariables.winText} ${gameVariables.playerOneState.pick}!`,
        },
      };
    case ACTIONS.ITD:
      return {
        ...gameVariables,
        innerText: {
          winningText: "Draw!",
          resultText: "Face your opponent again!",
        },
      };
    case ACTIONS.ITAGAIN:
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
