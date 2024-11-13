// Game board module
const Gameboard = (() => {
    let board = Array(9).fill('');
    
    const getBoard = () => board;
    
    const makeMove = (index, mark) => {
        if (board[index] === '') {
            board[index] = mark;
            return true;
        }
        return false;
    };
    
    const reset = () => {
        board = Array(9).fill('');
    };

    return { getBoard, makeMove, reset };
})();

// Player factory
const Player = (name, mark) => {
    return { name, mark };
};

// Game controller module
const GameController = (() => {
    let players = [];
    let currentPlayerIndex = 0;
    let gameOver = false;

    const start = (player1Name, player2Name) => {
        players = [
            Player(player1Name, 'X'),
            Player(player2Name, 'O')
        ];
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.reset();
    };

    const getCurrentPlayer = () => players[currentPlayerIndex];

    const switchPlayer = () => {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    };

    const checkWin = () => {
        const board = Gameboard.getBoard();
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        return winPatterns.some(pattern => {
            return pattern.every(index => {
                return board[index] === getCurrentPlayer().mark;
            });
        });
    };

    const checkTie = () => {
        return Gameboard.getBoard().every(cell => cell !== '');
    };

    const playTurn = (index) => {
        if (gameOver || !Gameboard.makeMove(index, getCurrentPlayer().mark)) {
            return false;
        }

        if (checkWin()) {
            gameOver = true;
            return 'win';
        }
        
        if (checkTie()) {
            gameOver = true;
            return 'tie';
        }

        switchPlayer();
        return true;
    };

    const isGameOver = () => gameOver;

    return { start, getCurrentPlayer, playTurn, isGameOver };
})();

// Display controller module
const DisplayController = (() => {
    const playerForm = document.getElementById('playerForm');
    const gameContainer = document.getElementById('gameContainer');
    const gameBoard = document.getElementById('gameBoard');
    const status = document.getElementById('status');
    const cells = document.querySelectorAll('.cell');
    const startBtn = document.getElementById('startGame');
    const restartBtn = document.getElementById('restartGame');
    const newGameBtn = document.getElementById('newGame'); // New Game button

    const updateBoard = () => {
        const board = Gameboard.getBoard();
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    };

    const updateStatus = (result) => {
        if (result === 'win') {
            status.textContent = `${GameController.getCurrentPlayer().name} Wins!`;
        } else if (result === 'tie') {
            status.textContent = "It's a Tie!";
        } else if (!GameController.isGameOver()) {
            status.textContent = `${GameController.getCurrentPlayer().name}'s Turn (${GameController.getCurrentPlayer().mark})`;
        }
    };

    const handleCellClick = (e) => {
        const index = e.target.dataset.index;
        const result = GameController.playTurn(index);

        updateBoard();
        updateStatus(result);
    };

    const initGame = () => {
        const player1Name = document.getElementById('player1').value || 'Player 1';
        const player2Name = document.getElementById('player2').value || 'Player 2';
        
        GameController.start(player1Name, player2Name);
        playerForm.style.display = 'none';
        gameContainer.style.display = 'block';
        updateStatus();  // Update status for the first turn
        updateBoard();
    };

    const resetGame = () => {
        GameController.start(
            GameController.getCurrentPlayer().name, 
            GameController.getCurrentPlayer().mark === 'X' ? 'O' : 'X'
        );
        updateStatus();  // Reset status for the new game
        updateBoard();
    };

    const newGame = () => {
        playerForm.style.display = 'block';
        gameContainer.style.display = 'none';
        Gameboard.reset();
        updateBoard();
    };

    // Event listeners
    startBtn.addEventListener('click', initGame);
    restartBtn.addEventListener('click', resetGame);
    newGameBtn.addEventListener('click', newGame); // Event for New Game button
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));

    return { updateBoard, updateStatus };
})();
