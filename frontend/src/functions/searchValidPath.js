import getNeighbors from "./getNeighbors";

const findStartingNode = (board) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] !== null) return [i, j];
        };
    };
};

const findFirstEndNode = (board) => {
    for (let i = board.length - 1; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] !== null) return [i, j];
        };
    };
};

const findLastEndNode = (board) => {
    for (let i = board.length - 1; i < board.length; i++) {
        for (let j = board[i].length - 1; j >= 0; j--) {
            if (board[i][j] !== null) return [i, j];
        };
    };
};

const searchValidPath = (board) => {
    const [fEndRow, fEndCol] = findFirstEndNode(board);
    const [lEndRow, lEndCol] = findLastEndNode(board);

    const visited = new Set([]);
    const queue = [findStartingNode(board)];

    let check = 0;
    while (queue.length) {
        const currAssembly = queue.shift();
        const [aRow, aCol] = currAssembly;
        const assemblyKey = `${aRow}-${aCol}`;

        if (!visited.has(assemblyKey)) visited.add(assemblyKey);

        if (aRow === lEndRow && aCol === lEndCol) check++;
        if (aRow === fEndRow && aCol === fEndCol) check++;
        if (check === 2) return true;

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

    return false;
};

export default searchValidPath;