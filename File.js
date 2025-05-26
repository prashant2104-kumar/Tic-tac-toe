let currentPlayer = 'X';
let board = Array(9).fill(null);
const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');

function startGame() {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  statusEl.textContent = '';
  renderBoard();
}

function renderBoard() {
  boardEl.innerHTML = '';
  board.forEach((value, index) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.textContent = value;
    cell.onclick = () => handleClick(index);
    boardEl.appendChild(cell);
  });
}

function handleClick(index) {
  if (board[index] || checkWinner()) return;
  board[index] = currentPlayer;
  if (checkWinner()) {
    statusEl.textContent = `${currentPlayer} wins!`;
  } else if (board.every(Boolean)) {
    statusEl.textContent = "It's a draw!";
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
  renderBoard();
}

function checkWinner() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

startGame();
