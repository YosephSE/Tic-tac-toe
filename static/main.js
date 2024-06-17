const cells = document.querySelectorAll(".cell");
const restartBtn = document.getElementById("reset-game");
const turnX = document.getElementById("turnX");
const turnO = document.getElementById("turnO");
const resultDiv = document.getElementById("result");
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
let x_win = 0;
let o_win = 0;
let draw = 0;

function initializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  updateTurnDisplay();
  running = true;
}

function cellClicked() {
  const index = this.getAttribute("index");

  if (board[index] != "" || !running) {
    return
  }

  updateCell(this, index);
  checkWinner();
}

function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateTurnDisplay();
}

function updateTurnDisplay() {
  if (currentPlayer === "X") {
    turnX.style.backgroundColor = "#007bff";
    turnX.style.color = "#fff";
    turnO.style.backgroundColor = "#fff";
    turnO.style.color = "#777";
  } else {
    turnO.style.backgroundColor = "#007bff";
    turnO.style.color = "#fff";
    turnX.style.backgroundColor = "#fff";
    turnX.style.color = "#777";
  }
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = board[condition[0]];
    const cellB = board[condition[1]];
    const cellC = board[condition[2]];

    if (cellA === "" || cellB === "" || cellC === "") {
      continue;
    }
    if (cellA === cellB && cellB === cellC) {
      roundWon = true;
      condition.forEach((index) => {
        cells[index].classList.add("winning-cell");
      });
      break;
    }
  }

  if (roundWon) {
    resultDiv.textContent = `${currentPlayer} wins!`;
    resultDiv.style.display = "block";
    running = false;
    if(currentPlayer === "X"){
      x_win++
      document.getElementById("x").innerText = x_win;
    }else{
      o_win++
      document.getElementById("o").innerText = o_win;
    }
  } else if (!board.includes("")) {
    resultDiv.textContent = `Draw!`;
    resultDiv.style.display = "block";
    running = false;
    draw++
    document.getElementById("draw").innerText = draw;
  } else {
    resultDiv.style.display = "none";
    changePlayer();
  }
}

function restartGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("winning-cell");
  });
  resultDiv.style.display = "none";
  updateTurnDisplay();
  running = true;
}


initializeGame();
