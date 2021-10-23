import React from "react";
import Cell from "../cell";
import "./style.css";

const GameBoard = ({ gameStatus, onCellClick }) => {
  return (
    <>
      <div className="game-board">
        <div className="board">
          {gameStatus.map((c) => (
            <Cell key={c.id} data={c} onCellClick={() => onCellClick(c)} />
          ))}
        </div>
      </div>
    </>
  );
};

export default GameBoard;
