const board = document.getElementById("game-board");
const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("reset-button");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6]             // Diagonal
];

function checkWinner() {
    for (let combination of winningCombinations) {
        let [a, b, c] = combination;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            highlightWinningCells(combination);
            launchFireworks();
            isGameActive = false;
            return;
        }
    }
}

function highlightWinningCells(combination) {
    combination.forEach(index => {
        cells[index].classList.add("winning-cell");
    });

    // Add a red line over winning cells
    const line = document.createElement("div");
    line.classList.add("win-line");

    if (combination[0] % 3 === 0 && combination[1] % 3 === 1) {
        // Horizontal line
        line.style.top = `${Math.floor(combination[0] / 3) * 105 + 50}px`;
        line.style.left = "10px";
    } else if (combination[0] < 3) {
        // Vertical line
        line.classList.add("vertical-line");
        line.style.left = `${combination[0] * 105 + 50}px`;
        line.style.top = "10px";
    } else if (combination[0] === 0 && combination[2] === 8) {
        // Diagonal from top-left to bottom-right
        line.classList.add("diagonal-line");
        line.style.top = "50px";
        line.style.left = "-10px";
    } else {
        // Diagonal from top-right to bottom-left
        line.classList.add("diagonal-line");
        line.style.top = "50px";
        line.style.left = "10px";
        line.style.transform = "rotate(-45deg)";
    }

    board.appendChild(line);
}

function launchFireworks() {
    for (let i = 0; i < 20; i++) {
        let firecracker = document.createElement("div");
        firecracker.classList.add("firecracker");
        firecracker.style.left = Math.random() * window.innerWidth + "px";
        firecracker.style.top = window.innerHeight + "px";
        firecracker.style.animationDuration = Math.random() * 1.5 + 1 + "s";
        firecracker.style.background = ["red", "yellow", "blue", "green", "purple"][Math.floor(Math.random() * 5)];
        document.body.appendChild(firecracker);

        setTimeout(() => firecracker.remove(), 2000);
    }
}

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (!gameState[index] && isGameActive) {
            gameState[index] = currentPlayer;
            cell.textContent = currentPlayer;
            checkWinner();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    });
});

resetButton.addEventListener("click", () => {
    gameState.fill("");
    isGameActive = true;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winning-cell");
    });
    document.querySelectorAll(".win-line").forEach(line => line.remove());
});
