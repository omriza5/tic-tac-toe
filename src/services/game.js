import { cloneDeep } from "lodash";
const NUM_OF_CELLS = 9;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const createBoardArray = () => {
  const result = [];

  for (let j = 0; j < NUM_OF_CELLS; j++) {
    const tempObj = {
      id: j,
      isFilled: false,
      value: "",
    };

    result.push(tempObj);
  }

  return result;
};

export const updateCellValue = (currentPlayer) => {
  const x = "x";
  const o = "o";

  // case first click
  if (!currentPlayer) return x;

  // case current player is x
  if (currentPlayer === x) return o;

  return x;
};

export const determineWinner = (gameStatus) => {
  if (gameStatus.length === 0) return;

  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameStatus[winCondition[0]];
    let b = gameStatus[winCondition[1]];
    let c = gameStatus[winCondition[2]];

    if (a.value === "" || b.value === "" || c.value === "") {
      continue;
    }
    if (a.value === b.value && b.value === c.value) {
      return a.value;
    }
  }
};

export const updateHistory = (historeis, index) => {
  const newArr = cloneDeep(historeis);
  return newArr.slice(0, index + 1);
};
