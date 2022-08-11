/** @format */
import React, { useState, useEffect } from "react";
import classRenderLogic from "./logic/classRenderLogic";

function Coin(props) {
  const [classes, setClasses] = useState("");
  useEffect(() => {
    classRenderLogic(props, setClasses);
  }, [props.gameState]);

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
  );
}

export default Coin;
