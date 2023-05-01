import getNeighbors from "./getNeighbors";

const generateRandomColor = () => {
    const colors = ['red', 'blue', 'rgb(0, 210, 0)'];

    return colors[Math.floor(Math.random() * colors.length)];
};

const reduceBoard = (board) => {
    const boardCopy = [...board];

    for (let i = 0; i < boardCopy.length; i++) {
        let randTotal = Math.floor(Math.random() * 6) + 2;

        while (randTotal > 0) {
            const randAssembly = Math.floor(Math.random() * boardCopy[i].length);

            boardCopy[i][randAssembly] = null;
            randTotal--;
        };
    };

    return boardCopy;
};

const placePlayers = (board) => {
    const boardCopy = [...board];
  
    const randPlayerRow = Math.floor(Math.random() * boardCopy.length);
    const randPlayerCol = Math.floor(Math.random() * boardCopy[randPlayerRow].length);
  
    if (boardCopy[randPlayerRow][randPlayerCol] === null) return placePlayers(boardCopy);
  
    boardCopy[randPlayerRow][randPlayerCol] = { usurper: 'player', troops: 10 };
  
    for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
        let randCPURow = Math.floor(Math.random() * boardCopy.length);
        let randCPUCol = Math.floor(Math.random() * boardCopy[randCPURow].length);

        if (boardCopy[randCPURow][randCPUCol] !== null) {
            if (Math.abs(randPlayerRow - randCPURow) >= 2) {
                if (board[randCPURow][randCPUCol].usurper !== 'player') {
                    boardCopy[randCPURow][randCPUCol] = { usurper: generateRandomColor(), troops: 25 };
                    continue;
                };
            };
        };
        i--;
    };
  
    return boardCopy;
  };

const generateRandomBoard = () => {
    const board = [];

    for (let i = 0; i < 4; i++) {
        board.push([]);

        for (let j = 0; j < 8; j++) {
            board[board.length - 1].push({ usurper: null, troops: 10 });
        };
    };

    const reducedBoard = reduceBoard(board);
    const positionedBoard = placePlayers(reducedBoard);

    for (let i = 0; i < positionedBoard.length; i++) {
        for (let j = 0; j < positionedBoard[i].length; j++) {
            const neighbors = getNeighbors(positionedBoard, [i, j]);
            if (!neighbors.length) return generateRandomBoard();
        };
    };

    return positionedBoard;
};

export default generateRandomBoard;