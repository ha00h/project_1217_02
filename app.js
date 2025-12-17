const cells = document.querySelectorAll("[data-cell]");
const statusEl = document.querySelector("[data-status]");
const resetButton = document.querySelector("[data-reset]");

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const state = {
  currentPlayer: "X",
  board: Array(9).fill(null),
  isGameOver: false,
  moveCount: 0,
};

const updateStatus = (message) => {
  statusEl.textContent = message;
};

const resetGame = () => {
  state.currentPlayer = "X";
  state.board = Array(9).fill(null);
  state.isGameOver = false;
  state.moveCount = 0;

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.disabled = false;
    cell.classList.remove("player-x", "player-o");
  });

  updateStatus("플레이어 X 차례");
};

const checkWin = (player) =>
  winningCombos.some((combo) =>
    combo.every((index) => state.board[index] === player),
  );

const handleDraw = () => {
  state.isGameOver = true;
  updateStatus("무승부입니다!");
};

const finishGame = (player) => {
  state.isGameOver = true;
  updateStatus(`플레이어 ${player} 승리!`);
  cells.forEach((cell) => {
    cell.disabled = true;
  });
};

const switchPlayer = () => {
  state.currentPlayer = state.currentPlayer === "X" ? "O" : "X";
  updateStatus(`플레이어 ${state.currentPlayer} 차례`);
};

const handleCellClick = (event) => {
  const cell = event.currentTarget;
  const cellIndex = Number(cell.dataset.index);

  if (state.board[cellIndex] || state.isGameOver) {
    return;
  }

  state.board[cellIndex] = state.currentPlayer;
  cell.textContent = state.currentPlayer;
  cell.classList.add(
    state.currentPlayer === "X" ? "player-x" : "player-o",
  );
  state.moveCount += 1;

  if (checkWin(state.currentPlayer)) {
    finishGame(state.currentPlayer);
    return;
  }

  if (state.moveCount === state.board.length) {
    handleDraw();
    return;
  }

  switchPlayer();
};

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
