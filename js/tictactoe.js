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
// Add body reference for disableClick function
let body;

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
            // Active player may only be 'X' or 'O', so if not 'X' it must be 'O'
        } else {
            // If activePlayer is equal to 'O', the o.png is placed in HTML
            select.style.backgroundImage = "url('images/o.png')";
        }
        
        // squareNumber and activePlayer are concatenated together and added to array
        selectedSquares.push(squareNumber + activePlayer);
        
        // This calls a function to check for any win conditions
        checkWinConditions();
        
        // Only switch players and update status if game is still active
        if (gameActive) {
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
            
            // Play audio
            audio('./media/place.mp3');
        }
    }
}

// This function parses the selectedSquares array to search for win conditions
// drawLine() function is called to draw a line on the screen if the condition is met
function checkWinConditions() {
    // Calculate offset for your specific layout
    // Your table is positioned with some margin from player names and game status
    const offsetY = 160; // Offset from top due to title, player names, and game status
    const offsetX = 0;   // No horizontal offset since table is centered
    
    // X 0, 1, 2 condition (top row)
    if (arrayIncludes('0X', '1X', '2X')) { drawWinLine(20 + offsetX, 100 + offsetY, 588 + offsetX, 100 + offsetY) }
    // X 3, 4, 5 condition (middle row)
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(20 + offsetX, 304 + offsetY, 588 + offsetX, 304 + offsetY) }
    // X 6, 7, 8 condition (bottom row)
    else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(20 + offsetX, 508 + offsetY, 588 + offsetX, 508 + offsetY) }
    // X 0, 3, 6 condition (left column)
    else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100 + offsetX, 20 + offsetY, 100 + offsetX, 588 + offsetY) }
    // X 1, 4, 7 condition (middle column)
    else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304 + offsetX, 20 + offsetY, 304 + offsetX, 588 + offsetY) }
    // X 2, 5, 8 condition (right column)
    else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508 + offsetX, 20 + offsetY, 508 + offsetX, 588 + offsetY) }
    // X 0, 4, 8 condition (diagonal top-left to bottom-right)
    else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(50 + offsetX, 50 + offsetY, 558 + offsetX, 558 + offsetY) }
    // X 2, 4, 6 condition (diagonal top-right to bottom-left)
    else if (arrayIncludes('2X', '4X', '6X')) { drawWinLine(558 + offsetX, 50 + offsetY, 50 + offsetX, 558 + offsetY) }
    
    // O conditions (same coordinates)
    // O 0, 1, 2 condition (top row)
    else if (arrayIncludes('0O', '1O', '2O')) { drawWinLine(20 + offsetX, 100 + offsetY, 588 + offsetX, 100 + offsetY) }
    // O 3, 4, 5 condition (middle row)
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(20 + offsetX, 304 + offsetY, 588 + offsetX, 304 + offsetY) }
    // O 6, 7, 8 condition (bottom row)
    else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(20 + offsetX, 508 + offsetY, 588 + offsetX, 508 + offsetY) }
    // O 0, 3, 6 condition (left column)
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100 + offsetX, 20 + offsetY, 100 + offsetX, 588 + offsetY) }
    // O 1, 4, 7 condition (middle column)
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304 + offsetX, 20 + offsetY, 304 + offsetX, 588 + offsetY) }
    // O 2, 5, 8 condition (right column)
    else if (arrayIncludes('2O', '5O', '8O')) { drawWinLine(508 + offsetX, 20 + offsetY, 508 + offsetX, 588 + offsetY) }
    // O 0, 4, 8 condition (diagonal top-left to bottom-right)
    else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(50 + offsetX, 50 + offsetY, 558 + offsetX, 558 + offsetY) }
    // O 2, 4, 6 condition (diagonal top-right to bottom-left)
    else if (arrayIncludes('2O', '4O', '6O')) { drawWinLine(558 + offsetX, 50 + offsetY, 50 + offsetX, 558 + offsetY) }
    
    // This condition checks for a tie. If none of the above conditions are met and
    // 9 squares are selected the code executes
    else if (selectedSquares.length >= 9) {
        // This function plays the tie game sound
        audio('./media/tie.mp3');
        // This function sets a .3 second timer before the resetGame is called
        setTimeout(function () { resetGame(); }, 500);
    }
    
    // This function checks if an array includes 3 variables passed through
    function arrayIncludes(squareA, squareB, squareC) {
        // These 3 variables will be used to check for 3 in a row
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
        // If the 3 variables are all included in our array then
        // true is returned and our else if condition executes the drawLine function
        if (a === true && b === true && c === true) { 
            // Set game as inactive when someone wins
            gameActive = false;
            // Update scores
            scores[activePlayer]++;
            updateScoreDisplay();
            // Update status to show winner
            gameStatus.textContent = `${playerNames[activePlayer]} Wins!`;
            return true;
        }
        return false;
    }
}

// This function makes our body element temporarily unclickable
function disableClick() {
    // This makes our body unclickable
    body.style.pointerEvents = 'none';
    // This makes our body clickable again after 1 second
    setTimeout(function () { body.style.pointerEvents = 'auto'; }, 1000);
}

// This function takes a string parameter of the path you set earlier for
// placement sound('./media/place.mp3')
function audio(audioURL) {
    // We create a new audio object and we pass the path as a parameter
    let audio = new Audio(audioURL);
    // Play method plays our audio sound
    audio.play().catch(error => {
        console.log('Audio playback failed:', error);
    });
}

// Enhanced drawWinLine function with better animation handling
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    // This line accesses our HTML canvas element
    const canvas = document.getElementById('win-lines');
    // Check if canvas exists
    if (!canvas) {
        console.log('Canvas element not found');
        return;
    }
    
    // This line gives us access to methods and properties to use on canvas
    const c = canvas.getContext('2d');
    // Clear any existing drawings
    c.clearRect(0, 0, 608, 608);
    
    // This line indicates where the start of a lines x axis is
    let x1 = coordX1,
        // This line indicates where the start of a lines y axis is
        y1 = coordY1,
        // This line indicates where the end of a lines x axis is
        x2 = coordX2,
        // This line indicates where the end of a lines y axis is
        y2 = coordY2,
        // This variable stores temporary x axis data we update in our animation loop
        x = x1,
        // This variable stores temporary y axis data we update in our animation loop
        y = y1;

    // Calculate the distance and steps for smooth animation
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const steps = Math.ceil(distance / 10);
    const xStep = (x2 - x1) / steps;
    const yStep = (y2 - y1) / steps;
    let currentStep = 0;

    // This function interacts with the canvas
    function animateLineDrawing() {
        if (currentStep <= steps) {
            // This variable creates the loop for when the game ends it restarts
            const animationLoop = requestAnimationFrame(animateLineDrawing);
            
            // This method clears content from the last loop iteration
            c.clearRect(0, 0, 608, 608);
            // This method starts a new path
            c.beginPath();
            // This method moves us to a starting point in our line
            c.moveTo(x1, y1);
            // This method indicates the end point in our line
            c.lineTo(x, y);
            // This method sets the width of our line
            c.lineWidth = 10;
            // This method sets the line cap style
            c.lineCap = 'round';
            // This method sets the color of our line
            c.strokeStyle = '#FFC107';
            // This method draws everything we laid out above
            c.stroke();
            
            // Update position for next frame
            x = x1 + (xStep * currentStep);
            y = y1 + (yStep * currentStep);
            currentStep++;
        }
    }

    // This function clears our canvas after our win line is drawn
    function clear() {
        // This method clears our canvas
        c.clearRect(0, 0, 608, 608);
    }
    
    // This method disallows clicking while the win sound is playing
    disableClick();
    // This method plays the win sound
    audio('./media/winGame.mp3');
    // This method calls our main animation loop
    animateLineDrawing();
    // This method waits 1 second then clears canvas and calls the resetGame function
    setTimeout(function () { clear(); resetGame(); }, 1000);
}

// This function resets the game in the event of a tie or a win
function resetGame() {
    // This for loop iterates through each HTML square element
    for (let i = 0; i < 9; i++) {
        // This variable gets the HTML element i
        let square = document.getElementById(i.toString());
        // This removes our elements backgroundImage
        square.style.backgroundImage = '';
    }
    // This resets our array so it is empty and we can start over
    selectedSquares = [];
    // Reset game state
    activePlayer = 'X';
    gameActive = true;
    updateGameStatus();
}

// Function to start a new game
function newGame() {
    resetGame();
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
    // Get body element reference
    body = document.getElementById('body');
    
    // Add click events to buttons
    newGameBtn.addEventListener('click', newGame);
    resetScoreBtn.addEventListener('click', resetScore);
    changeNamesBtn.addEventListener('click', showNameModal);
    
    // Name modal events
    document.getElementById('saveNamesBtn').addEventListener('click', saveNames);
    
    // Initialize display
    updateDisplay();
});