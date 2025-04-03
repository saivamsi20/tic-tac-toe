const cells = document.querySelectorAll('.cell');
const messageDisplay = document.getElementById('message');
const resetButton = document.getElementById('reset');
let darkModeToggle = document.createElement("button"); // Create Dark Mode Button


let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// 🎵 Sound Effects
const clickSound = new Audio('https://www.fesliyanstudios.com/play-mp3/11'); // Click Sound
const winSound = new Audio('https://www.fesliyanstudios.com/play-mp3/12'); // Win Sound
const drawSound = new Audio('https://www.fesliyanstudios.com/play-mp3/1'); // Draw Sound

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !isGameActive) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.transform = "scale(1.1)"; // Small pop animation
    setTimeout(() => cell.style.transform = "scale(1)", 100);

    clickSound.play(); // Play Click Sound

    checkWinner();
}

function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            isGameActive = false;
            messageDisplay.textContent = `Player ${currentPlayer} wins!`;
            
            // 🎉 Highlight Winning Cells
            document.querySelectorAll('.cell')[a].classList.add('winning-cell');
            document.querySelectorAll('.cell')[b].classList.add('winning-cell');
            document.querySelectorAll('.cell')[c].classList.add('winning-cell');

            winSound.play(); // Play Win Sound
            return;
        }
    }

    if (!board.includes('')) {
        isGameActive = false;
        messageDisplay.textContent = "It's a tie!";
        drawSound.play(); // Play Draw Sound
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    messageDisplay.textContent = '';

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning-cell');
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

// 🌙 Toggle Dark Mode
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});





// Create Dark Mode Toggle Button
darkModeToggle = document.createElement("button");
darkModeToggle.id = "darkModeToggle";
darkModeToggle.innerHTML = "🌙"; // Default icon: Moon

// Group buttons together
const buttonContainer = document.createElement("div");
buttonContainer.classList.add("button-container");
resetButton.parentNode.insertBefore(buttonContainer, resetButton);
buttonContainer.appendChild(resetButton);
buttonContainer.appendChild(darkModeToggle);

let isDarkMode = false;

// 🌙 Toggle Dark Mode with Smooth Animation
darkModeToggle.addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle("dark-mode");

    // Change icon & animate rotation
    darkModeToggle.innerHTML = isDarkMode ? "☀️" : "🌙";
    darkModeToggle.style.transform = "rotate(360deg)"; 
    setTimeout(() => darkModeToggle.style.transform = "", 300); // Reset rotation smoothly
});
