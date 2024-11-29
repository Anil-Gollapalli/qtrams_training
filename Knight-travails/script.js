document.addEventListener('DOMContentLoaded', () => {
    const chessboard = document.getElementById('chessboard');
    const findPathButton = document.getElementById('findPath');
    const pathOutput = document.getElementById('pathOutput');

    function createChessboard() {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.classList.add((row + col) % 2 === 0 ? 'white' : 'black');
                square.setAttribute('data-pos', `${row},${col}`);
                chessboard.appendChild(square);
            }
        }
    }

    function clearPath() {
        document.querySelectorAll('.chessboard .path, .knight').forEach(el => el.classList.remove('path', 'knight'));
    }

    function highlightPath(path) {
        clearPath();
        path.forEach((position, index) => {
            const [row, col] = position;
            const square = chessboard.querySelector(`[data-pos="${row},${col}"]`);
            if (square) {
                if (index === 0) square.classList.add('knight'); 
                else square.classList.add('path');
            }
        });
    }

    function knightMoves(start, end) {
        const moves = [[2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [-1, -2], [1, -2], [2, -1]];
        const isValid = pos => pos[0] >= 0 && pos[0] < 8 && pos[1] >= 0 && pos[1] < 8;
        const queue = [[start, null]];
        const visited = new Map();
        visited.set(start.toString(), null);

        while (queue.length > 0) {
            const [current, predecessor] = queue.shift();
            if (current[0] === end[0] && current[1] === end[1]) {
                const path = [];
                let node = current;
                while (node) {
                    path.push(node);
                    node = visited.get(node.toString());
                }
                return path.reverse();
            }
            for (const [dx, dy] of moves) {
                const next = [current[0] + dx, current[1] + dy];
                if (isValid(next) && !visited.has(next.toString())) {
                    queue.push([next, current]);
                    visited.set(next.toString(), current);
                }
            }
        }
        return [];
    }

    findPathButton.addEventListener('click', () => {
        const startInput = document.getElementById('start').value.split(',').map(Number);
        const endInput = document.getElementById('end').value.split(',').map(Number);
        if (startInput.length === 2 && endInput.length === 2 && !isNaN(startInput[0]) && !isNaN(startInput[1]) && !isNaN(endInput[0]) && !isNaN(endInput[1])) {
            const path = knightMoves(startInput, endInput);
            if (path.length > 0) {
                pathOutput.textContent = `You made it in ${path.length - 1} moves! Path: ${JSON.stringify(path)}`;
                highlightPath(path);
            } else {
                pathOutput.textContent = 'No valid path found!';
            }
        } else {
            pathOutput.textContent = 'Invalid input! Please use the format "x,y".';
        }
    });

    createChessboard();
});
