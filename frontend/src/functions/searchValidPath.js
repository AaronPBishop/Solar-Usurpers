import getNeighbors from "./getNeighbors";

const findStartingNode = (board) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] !== null) return [i, j];
        };
    };
};

const searchValidPath = (board) => {
    const visited = new Set();
    const queue = [findStartingNode(board)];

    while (queue.length) {
        const currAssembly = queue.shift();
        const [aRow, aCol] = currAssembly;
        const assemblyKey = `${aRow}-${aCol}`;

        if (!visited.has(assemblyKey)) visited.add(assemblyKey);

        const neighbors = getNeighbors(board, [aRow, aCol]);
        for (let neighbor of neighbors) {
            const [nRow, nCol] = neighbor;
            const nKey = `${nRow}-${nCol}`;

            if (!visited.has(nKey)) {
                visited.add(nKey);
                queue.push(neighbor);
            };
        };
    };

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            const assemblyKey = `${i}-${j}`;

            if (board[i][j] && !visited.has(assemblyKey)) return false;
        };
    };

    return true;
};

export default searchValidPath;