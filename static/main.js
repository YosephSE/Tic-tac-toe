const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("currentPlayer");
const restartBtn = document.getElementById("restart");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}
function restartGame(){
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}


function cellClicked(){
    const index = this.getAttribute("index");

    if(board[index] != "" || !running){
        return;
    }

    updateCell(this, index);
    checkWinner();
}

function updateCell(cell, index){
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

initializeGame();