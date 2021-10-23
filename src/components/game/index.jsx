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
    // setWinner(handleResultValidation(gameStatus));

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
    setGameStatus(historyObj.gameStatus);
    setCurrentPlayer(historyObj.currentPlayer);
    setNextPlayer(historyObj.nextPlayer);
    setNumOfRounds(historyObj.numOfRounds);
    setWinner(historyObj.winner);
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
