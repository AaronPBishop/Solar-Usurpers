const getNeighbors = (board, assemblyCoord) => {
    const [row, col] = assemblyCoord;

    const neighbors = [
        [row - 1, col],
        [row + 1, col],
        [row, col - 1],
        [row, col + 1],
        [row - 1, col - 1],
        [row - 1, col + 1],
        [row + 1, col - 1],
        [row + 1, col + 1]
    ];

    const validNeighbors = [];
    for (let neighbor of neighbors) {
        const [nRow, nCol] = neighbor;

        if (nRow >= 0 && nRow < board.length && nCol >= 0 && nCol < board[0].length) {
            if (board[nRow][nCol] !== null) validNeighbors.push(neighbor);
        };
    };

    return validNeighbors;
};

export default getNeighbors;