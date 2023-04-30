const generateRandomColor = () => {
    const colors = ['red', 'blue', 'green'];

    return colors[Math.floor(Math.random() * colors.length)];
};

const reduceBoard = (board) => {
    const boardCopy = [...board];

    for (let i = 0; i < boardCopy.length; i++) {
        let randTotal = Math.floor(Math.random() * 3) + 1;

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

    const randCPURow = Math.floor(Math.random() * boardCopy.length);
    const randCPUCol = Math.floor(Math.random() * boardCopy[randCPURow].length);

    const randPlayerRow = Math.floor(Math.random() * boardCopy.length);
    const randPlayerCol = Math.floor(Math.random() * boardCopy[randPlayerRow].length);

    if (boardCopy[randCPURow][randCPUCol] === null) return placePlayers(boardCopy);
    if (boardCopy[randPlayerRow][randPlayerCol] === null) return placePlayers(boardCopy);
    if (randCPURow === randPlayerRow) return placePlayers(boardCopy);

    boardCopy[randCPURow][randCPUCol] = { usurper: generateRandomColor(), troops: 25 };
    boardCopy[randPlayerRow][randPlayerCol] = { usurper: 'player', troops: 10 };

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

    return placePlayers(reducedBoard);
};

export default generateRandomBoard;