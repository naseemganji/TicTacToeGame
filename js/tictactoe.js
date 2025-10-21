// This variable keeps track of whose turn it is
let activePlayer = 'X';
// This array stores an array of moves. We use this to determine win conditions
let selectedSquares = [];
let gameActive = true;
let playerNames = { X: 'Player 1', O: 'Player 2' };
let scores = { X: 0, O: 0, ties: 0 };

// Get HTML elements
let gameStatus = document.getElementById('gameStatus');
let newGameBtn = document.getElementById('newGameBtn');
let resetScoreBtn = document.getElementById('resetScoreBtn');
let changeNamesBtn = document.getElementById('changeNamesBtn');

// This function is for placing an x or o in a square
function placeXOrO(squareNumber) {
    // This condition ensures a square hasn't been selected already
    // The .some() method is used to check each element of the selectedSquares array
    // to see if it contains the square number clicked on
    if (!selectedSquares.some(element => element.includes(squareNumber)) && gameActive) {
        // This variable retrieves the HTML element id that was clicked
        let select = document.getElementById(squareNumber);
        
        // This condition checks who's turn it is
        if (activePlayer === 'X') {
            // If activePlayer is equal to 'X', the x.png is placed in HTML
            select.style.backgroundImage = "url('images/x.png')";
            select.classList.add('x');
            // Active player may only be 'X' or 'O', so if not 'X' it must be 'O'
        } else {
            // If activePlayer is equal to 'O', the o.png is placed in HTML
            select.style.backgroundImage = "url('images/o.png')";
            select.classList.add('o');
        }
        
        // squareNumber and activePlayer are concatenated together and added to array
        selectedSquares.push(squareNumber + activePlayer);
        
        // This calls a function to check for any win conditions
        checkWinConditions();
        
        // This condition is for changing the active player
        if (activePlayer === 'X') {
            // If active player is 'X' change it to 'O'
            activePlayer = 'O';
        } else {
            // If active player is anything other than 'X'
            // Change the activePlayer to 'X'
            activePlayer = 'X';
        }
        
        // Update game status display
        updateGameStatus();
    }
}

// Function to check win conditions - using template structure
function checkWinConditions() {
    // These arrays list winning conditions
    if (checkWinCondition([0, 1, 2], [0, 1, 2]) ||
        checkWinCondition([3, 4, 5], [3, 4, 5]) ||
        checkWinCondition([6, 7, 8], [6, 7, 8]) ||
        checkWinCondition([0, 3, 6], [0, 3, 6]) ||
        checkWinCondition([1, 4, 7], [1, 4, 7]) ||
        checkWinCondition([2, 5, 8], [2, 5, 8]) ||
        checkWinCondition([0, 4, 8], [0, 4, 8]) ||
        checkWinCondition([2, 4, 6], [2, 4, 6])) {
        
        // Game won
        gameActive = false;
        gameStatus.textContent = `${playerNames[activePlayer]} Wins!`;
        scores[activePlayer]++;
        updateScoreDisplay();
        
    } else if (selectedSquares.length >= 9) {
        // Check for tie
        gameActive = false;
        gameStatus.textContent = "It's a Tie!";
        scores.ties++;
        updateScoreDisplay();
    }
}

// Function to check a specific win condition
function checkWinCondition(squareNums, line) {
    const a = squareNums[0], b = squareNums[1], c = squareNums[2];
    
    if (selectedSquares.some(element => element === a + activePlayer) &&
        selectedSquares.some(element => element === b + activePlayer) &&
        selectedSquares.some(element => element === c + activePlayer)) {
        
        // Highlight winning squares
        highlightWinningSquares(line);
        return true;
    }
    return false;
}

// Function to highlight winning squares
function highlightWinningSquares(line) {
    line.forEach(index => {
        document.getElementById(index).classList.add('winner');
    });
}

// Function to start a new game
function newGame() {
    // Reset game variables
    selectedSquares = [];
    activePlayer = 'X';
    gameActive = true;
    
    // Reset all squares - Updated for table cells with IDs
    for (let i = 0; i < 9; i++) {
        let square = document.getElementById(i);
        square.style.backgroundImage = '';
        square.classList.remove('winner', 'x', 'o');
    }
    
    // Update display
    updateGameStatus();
}

// Function to reset scores
function resetScore() {
    scores = { X: 0, O: 0, ties: 0 };
    updateScoreDisplay();
}

// Function to show name modal
function showNameModal() {
    document.getElementById('nameModal').style.display = 'flex';
    document.getElementById('inputPlayerX').value = playerNames.X;
    document.getElementById('inputPlayerO').value = playerNames.O;
}

// Function to save player names
function saveNames() {
    const newNameX = document.getElementById('inputPlayerX').value.trim() || 'Player 1';
    const newNameO = document.getElementById('inputPlayerO').value.trim() || 'Player 2';
    
    playerNames.X = newNameX;
    playerNames.O = newNameO;
    
    updateDisplay();
    document.getElementById('nameModal').style.display = 'none';
}

// Function to update game status
function updateGameStatus() {
    if (gameActive) {
        gameStatus.textContent = `${playerNames[activePlayer]}'s Turn (${activePlayer})`;
    }
}

// Function to update display
function updateDisplay() {
    // Update player names
    document.getElementById('playerXName').textContent = playerNames.X;
    document.getElementById('playerOName').textContent = playerNames.O;
    document.getElementById('scorePlayerX').textContent = playerNames.X;
    document.getElementById('scorePlayerO').textContent = playerNames.O;
    
    // Update game status
    updateGameStatus();
    updateScoreDisplay();
}

// Function to update score display
function updateScoreDisplay() {
    document.getElementById('scoreX').textContent = scores.X;
    document.getElementById('scoreO').textContent = scores.O;
    document.getElementById('scoreTies').textContent = scores.ties;
}

// Event listeners - set up when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Add click events to buttons
    newGameBtn.addEventListener('click', newGame);
    resetScoreBtn.addEventListener('click', resetScore);
    changeNamesBtn.addEventListener('click', showNameModal);
    
    // Name modal events
    document.getElementById('saveNamesBtn').addEventListener('click', saveNames);
    
    // Initialize display
    updateDisplay();
});