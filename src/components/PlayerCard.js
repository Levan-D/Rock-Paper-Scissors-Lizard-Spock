/** @format */

function PlayerCard(props) {
  return (
    <div className="PlayerCard">
      <div
        className="PlayerCardMargin"
        style={{
          color: props.player == "Player" ? "#3286e6" : "#e63832",
        }}
      >
        {props.player}
      </div>
      <div>{props.show != " " ? props.choice : <span>&nbsp;</span>}</div>
      <div className="PlayerCardMargin">Score:</div>
      <div>{props.score}</div>
    </div>
  )
}

export default PlayerCard
