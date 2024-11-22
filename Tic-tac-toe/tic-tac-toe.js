// Gameboard module
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

    const checkWin = (board = Gameboard.getBoard(), mark = getCurrentPlayer().mark) => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        return winPatterns.some(pattern =>
            pattern.every(index => board[index] === mark)
        );
    };

    const checkTie = (board = Gameboard.getBoard()) => {
        return board.every(cell => cell !== '');
    };

    const calculateProbabilities = () => {
        const board = Gameboard.getBoard();
        const outcomes = { X: 0, O: 0, tie: 0, total: 0 };

        const simulate = (currentBoard, currentMark) => {
            if (checkWin(currentBoard, 'X')) {
                outcomes.X++;
                outcomes.total++;
                return;
            }

            if (checkWin(currentBoard, 'O')) {
                outcomes.O++;
                outcomes.total++;
                return;
            }

            if (checkTie(currentBoard)) {
                outcomes.tie++;
                outcomes.total++;
                return;
            }

            const nextMark = currentMark === 'X' ? 'O' : 'X';

            for (let i = 0; i < 9; i++) {
                if (currentBoard[i] === '') {
                    const newBoard = [...currentBoard];
                    newBoard[i] = currentMark;
                    simulate(newBoard, nextMark);
                }
            }
        };

        simulate(board, getCurrentPlayer().mark);

        return {
            xWin: ((outcomes.X / outcomes.total) * 100).toFixed(2),
            oWin: ((outcomes.O / outcomes.total) * 100).toFixed(2),
            draw: ((outcomes.tie / outcomes.total) * 100).toFixed(2)
        };
    };

    const playTurn = index => {
        if (gameOver || !Gameboard.makeMove(index, getCurrentPlayer().mark)) {
            return false;
        }

        // Check for a winner or tie after the move has been made
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

    return { start, getCurrentPlayer, playTurn, isGameOver, calculateProbabilities };
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
    const newGameBtn = document.getElementById('newGame');
    const xWinProb = document.getElementById('xWinProb');
    const oWinProb = document.getElementById('oWinProb');
    const drawProb = document.getElementById('drawProb');

    const updateBoard = () => {
        const board = Gameboard.getBoard();
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    };

    const updateStatus = result => {
        if (result === 'win') {
            alert(`${GameController.getCurrentPlayer().name} Wins!`);
            status.textContent = `${GameController.getCurrentPlayer().name} Wins!`;
        } else if (result === 'tie') {
            status.textContent = "It's a Tie!";
        } else if (!GameController.isGameOver()) {
            status.textContent = `${GameController.getCurrentPlayer().name}'s Turn (${GameController.getCurrentPlayer().mark})`;
        }
    };

    const updateProbabilities = (initial = false) => {
        if (initial) {
            xWinProb.textContent = `Player X Win %: 0.00`;
            oWinProb.textContent = `Player O Win %: 0.00`;
            drawProb.textContent = `Draw %: 0.00`;
            return;
        }
        const probabilities = GameController.calculateProbabilities();
        xWinProb.textContent = `Player X Win %: ${probabilities.xWin}`;
        oWinProb.textContent = `Player O Win %: ${probabilities.oWin}`;
        drawProb.textContent = `Draw %: ${probabilities.draw}`;
    };

    const handleCellClick = e => {
        const index = e.target.dataset.index;
        const result = GameController.playTurn(index);

        updateBoard();
        updateStatus(result);
        updateProbabilities();
    };

    const initGame = () => {
        const player1Name = document.getElementById('player1').value || 'Player 1';
        const player2Name = document.getElementById('player2').value || 'Player 2';

        GameController.start(player1Name, player2Name);
        playerForm.style.display = 'none';
        gameContainer.style.display = 'block';
        updateStatus();
        updateBoard();
        updateProbabilities(true); // Initialize probabilities to 0%
    };

    const resetGame = () => {
        GameController.start(
            GameController.getCurrentPlayer().name,
            GameController.getCurrentPlayer().mark === 'X' ? 'O' : 'X'
        );
        updateStatus();
        updateBoard();
        updateProbabilities(true); // Reinitialize probabilities to 0%
    };

    const newGame = () => {
        playerForm.style.display = 'block';
        gameContainer.style.display = 'none';
        Gameboard.reset();
        updateBoard();
    };

    startBtn.addEventListener('click', initGame);
    restartBtn.addEventListener('click', resetGame);
    newGameBtn.addEventListener('click', newGame);
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));

    return { updateBoard, updateStatus };
})();
