import React from "react";
import Header from "./components/header";
import Game from "./components/game";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="app-header">
        <Header title="Tic Tac Toe" />
      </div>
      <div className="app-game">
        <Game />
      </div>
    </div>
  );
}

export default App;
