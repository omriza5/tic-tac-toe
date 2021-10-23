import React, { useEffect, useState } from "react";
import GameBoard from "../gameBoard";
import {
  createBoardArray,
  determineWinner,
  updateCellValue,
} from "../../services/game";
import { cloneDeep } from "lodash";
import "./style.css";
import HistoryList from "../historyList/index";
import Button from "../button/index";

const Game = () => {
  const [gameStatus, setGameStatus] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [nextPlayer, setNextPlayer] = useState("");
  const [numOfRounds, setNumOfRounds] = useState(0);
  const [winner, setWinner] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setGameStatus(createBoardArray());
  }, []);

  useEffect(() => {
    setWinner(determineWinner(gameStatus));

    const updateNext = () => {
      if (currentPlayer === "x") setNextPlayer("o");
      else if (currentPlayer === "o") setNextPlayer("x");
    };
    updateNext();
  }, [gameStatus, winner, currentPlayer]);

  const handleCellClick = (pressedCell) => {
    // disable cell clicks if there is a winner
    if (winner || numOfRounds === 9) return;

    const newGameStatus = [...gameStatus];
    const cell = newGameStatus.find((c) => c.id === pressedCell.id);

    if (!cell.isFilled) {
      cell.isFilled = true;
      cell.value = updateCellValue(currentPlayer);
      setCurrentPlayer(cell.value);
      setGameStatus(newGameStatus);
      setNumOfRounds(numOfRounds + 1);

      setHistory([
        ...history,
        {
          gameStatus: cloneDeep(newGameStatus),
          currentPlayer,
          nextPlayer,
          winner,
          numOfRounds,
        },
      ]);
    }
  };

  const handleHistoryClick = (historyObj, index) => {
    //case first there is only first round
    if (history.length === 1) return;

    // case clicking the last step
    if (history.length === index + 1) return;

    setGameStatus(historyObj.gameStatus);
    setCurrentPlayer(historyObj.currentPlayer === "x" ? "o" : "x");
    setNextPlayer(historyObj.nextPlayer === "o" ? "x" : "o");
    setNumOfRounds(historyObj.numOfRounds + 1);
    setWinner(historyObj.winner);
    setHistory(popFromArray(history, index));
  };

  const popFromArray = (arr, index) => {
    const newArr = cloneDeep(arr);
    return newArr.slice(0, index + 1);
  };

  return (
    <div className="game-container">
      <div className="game-main">
        <HistoryList history={history} onHistoryClick={handleHistoryClick} />
        <GameBoard gameStatus={gameStatus} onCellClick={handleCellClick} />
      </div>
      <div className="game-footer">
        <div className="round-info">
          <p>Previous Player: {currentPlayer}</p>
          <p>Current Player: {nextPlayer}</p>
        </div>
        <div className="game-result">
          {winner && <h1>The Winner Is: {winner}</h1>}
          {numOfRounds === 9 && !winner && <h1>Its A draw</h1>}
          {(winner || (numOfRounds === 9 && !winner)) && (
            <Button
              value="Play Again"
              onButtonClick={() => window.location.reload()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
