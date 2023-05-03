import searchValidPath from "./searchValidPath";

const reduceBoard = (board) => {
    const boardCopy = [...board];

    for (let i = 0; i < boardCopy.length; i++) {
        let randTotal = Math.floor(Math.random() * 6) + 3;

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
  
    boardCopy[randPlayerRow][randPlayerCol] = { usurper: 'player', troops: 10, attackData: { isAttacking: false, numTroops: 0, targetPos: [] }, position: null, randKey: 0 };

    const CPUcolors = ['blue', 'red', 'rgb(0, 220, 0)'];
    let numCPUs = Math.floor(Math.random() * 2) + 2;
    while (numCPUs > 0) {
        let randCPURow = Math.floor(Math.random() * boardCopy.length);
        let randCPUCol = Math.floor(Math.random() * boardCopy[randCPURow].length);

        if (boardCopy[randCPURow][randCPUCol] !== null) {
            if (Math.abs(randPlayerRow - randCPURow) >= 1 && Math.abs(randPlayerCol - randCPUCol) >= 1) {
                if (board[randCPURow][randCPUCol].usurper === null) {
                    const CPUColor = CPUcolors.shift();

                    boardCopy[randCPURow][randCPUCol] = { usurper: CPUColor, troops: 25, attackData: { isAttacking: false, numTroops: 0, targetPos: [] }, position: null, randKey: 0 };
                    numCPUs--;
                };
            };
        };
    };
  
    return boardCopy;
  };

const generateRandomBoard = () => {
    const board = [];

    for (let i = 0; i < 4; i++) {
        board.push([]);

        for (let j = 0; j < 8; j++) {
            board[board.length - 1].push({ usurper: null, troops: 10, attackData: { isAttacking: false, numTroops: 0, targetPos: [] }, position: null, randKey: 0 });
        };
    };

    const reducedBoard = reduceBoard(board);
    const positionedBoard = placePlayers(reducedBoard);

    if (!searchValidPath(positionedBoard)) return generateRandomBoard();

    return positionedBoard;
};

export default generateRandomBoard;