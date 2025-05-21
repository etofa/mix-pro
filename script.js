// Tic Tac Toe Game Logic

const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board');
const gameInfo = document.getElementById('game-info');
const restartBtn = document.getElementById('restart-btn');

let oTurn;

startGame();

restartBtn.addEventListener('click', startGame);

function startGame() {
  oTurn = false;
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverClass();
  gameInfo.textContent = "X's Turn";
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? O_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
    gameInfo.textContent = `${oTurn ? "O" : "X"}'s Turn`;
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.textContent = currentClass.toUpperCase();
}

function swapTurns() {
  oTurn = !oTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  if (oTurn) {
    board.classList.add(O_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function endGame(draw) {
  if (draw) {
    gameInfo.textContent = "It's a Draw!";
  } else {
    gameInfo.textContent = `${oTurn ? "O" : "X"} Wins!`;
  }
  cellElements.forEach(cell => cell.removeEventListener('click', handleClick));
}

// Tasbeeh Counter Logic

const countEl = document.getElementById('count');
const incrementBtn = document.getElementById('increment-btn');
const resetBtn = document.getElementById('reset-btn');

let count = 0;

incrementBtn.addEventListener('click', () => {
  count++;
  updateCount();
});

resetBtn.addEventListener('click', () => {
  count = 0;
  updateCount();
});

function updateCount() {
  countEl.textContent = count;
}
