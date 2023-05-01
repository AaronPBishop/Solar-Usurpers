import generateRandomBoard from "../functions/generateRandomBoard";
import getNeighbors from "../functions/getNeighbors";

const initialState = {
    board: [],
    selectedAssemblies: [],
    selectedTarget: [],
    previousAttackers: [],
    isAttacking: false
};

// ACTION CREATORS
export const generateBoard = () => {
    return { type: 'GENERATE_BOARD' };
};

export const setPosition = (coordinates, position) => {
    return { 
        type: 'SET_POSITION',
        payload1: coordinates,
        payload2: position
    };
};


export const incrementTroops = (coordinates) => {
    return { 
        type: 'INCREMENT_TROOPS',
        payload: coordinates
    };
};

export const setAssemblies = (coordinates) => {
    return { 
        type: 'SET_ASSEMBLIES',
        payload: coordinates
    };
};

export const setTarget = (coordinates) => {
    return { 
        type: 'SET_TARGET',
        payload: coordinates
    };
};

export const launchAttack = () => {
    return { 
        type: 'LAUNCH_ATTACK'
    };
};

export const restorePeace = () => {
    return { 
        type: 'RESTORE_PEACE'
    };
};

// MAIN REDUCER
const gameReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'GENERATE_BOARD': {
            currentState.board = generateRandomBoard();

            return currentState;
        };

        case 'SET_POSITION': {
            const boardCopy = [...currentState.board];
            
            boardCopy[action.payload1.row][action.payload1.col].position = action.payload2;
            currentState.board = boardCopy;

            return currentState;
        };

        case 'INCREMENT_TROOPS': {
            const boardCopy = [...currentState.board];
            
            boardCopy[action.payload.row][action.payload.col].troops += 1;
            currentState.board = boardCopy;

            return currentState;
        };

        case 'SET_ASSEMBLIES': {
            const assembliesCopy = [...currentState.selectedAssemblies];

            if (!assembliesCopy.length) {
                assembliesCopy.push([action.payload.row, action.payload.col]);

                currentState.selectedAssemblies = assembliesCopy;
                return currentState;
            };

            for (let i = 0; i < assembliesCopy.length; i++) {
                const [row, col] = assembliesCopy[i];

                if (row === action.payload.row && col === action.payload.col) {
                    assembliesCopy.splice(i, 1);

                    if (!assembliesCopy.length) currentState.selectedTarget = [];
                    currentState.selectedAssemblies = assembliesCopy;

                    return currentState;
                };
            };

            assembliesCopy.push([action.payload.row, action.payload.col]);

            currentState.selectedAssemblies = assembliesCopy;
            return currentState;
        };

        case 'SET_TARGET': {
            if (!currentState.selectedAssemblies.length) return currentState;

            if (currentState.selectedTarget.length && currentState.selectedTarget[0] === action.payload.row && currentState.selectedTarget[1] === action.payload.col) {
                currentState.selectedTarget = [];
                
                return currentState;
            };

            for (let i = 0; i < currentState.selectedAssemblies.length; i++) {
                const [row, col] = currentState.selectedAssemblies[i];
                const neighbors = getNeighbors(currentState.board, [row, col]);

                for (let neighbor of neighbors) {
                    const [nRow, nCol] = neighbor;
                    
                    if (action.payload.row === nRow && action.payload.col === nCol) {
                        currentState.selectedTarget = [action.payload.row, action.payload.col];
                        return currentState;
                    };
                };
            };

            return currentState;
        };

        case 'LAUNCH_ATTACK': {
            const boardCopy = [...currentState.board];

            if (!currentState.selectedTarget.length) {
                const assembliesCopy = [...currentState.selectedAssemblies];
                const [targetAllyRow, targetAllyCol] = assembliesCopy.pop();

                for (let coord of assembliesCopy) {
                    const [assemblyRow, assemblyCol] = coord;
    
                    boardCopy[targetAllyRow][targetAllyCol].troops += boardCopy[assemblyRow][assemblyCol].troops; 
    
                    boardCopy[assemblyRow][assemblyCol].attackData.isAttacking = true;
                    boardCopy[assemblyRow][assemblyCol].attackData.numTroops = boardCopy[assemblyRow][assemblyCol].troops;
                    boardCopy[assemblyRow][assemblyCol].attackData.targetPos = [boardCopy[targetAllyRow][targetAllyCol].position.x, boardCopy[targetAllyRow][targetAllyCol].position.y];

                    boardCopy[assemblyRow][assemblyCol].troops = 0;
                };
                
                currentState.board = boardCopy;
                currentState.previousAttackers = currentState.selectedAssemblies;
                currentState.selectedAssemblies = [];
                currentState.selectedTarget = [];
                currentState.isAttacking = true;

                return currentState;
            };

            const [targetRow, targetCol] = currentState.selectedTarget;

            let assemblyTroops = 0;
            let numAssemblies = currentState.selectedAssemblies.length;

            for (let coord of currentState.selectedAssemblies) {
                const [assemblyRow, assemblyCol] = coord;
                assemblyTroops += boardCopy[assemblyRow][assemblyCol].troops;
            };
        
            let totalTroopsTaken = Math.min(assemblyTroops, boardCopy[targetRow][targetCol].troops);
            let troopsPerAssembly = Math.floor(totalTroopsTaken / numAssemblies);
        
            for (let coord of currentState.selectedAssemblies) {
                const [assemblyRow, assemblyCol] = coord;

                let assemblyTroops = boardCopy[assemblyRow][assemblyCol].troops;
                let troopsTaken = Math.min(troopsPerAssembly, assemblyTroops, totalTroopsTaken);

                boardCopy[assemblyRow][assemblyCol].troops -= troopsTaken;
                totalTroopsTaken -= troopsTaken;

                boardCopy[assemblyRow][assemblyCol].attackData.isAttacking = true;
                boardCopy[assemblyRow][assemblyCol].attackData.numTroops = troopsTaken;
                boardCopy[assemblyRow][assemblyCol].attackData.targetPos = [boardCopy[targetRow][targetCol].position.x, boardCopy[targetRow][targetCol].position.y];
            };
        
            boardCopy[targetRow][targetCol].troops -= assemblyTroops;
            if (boardCopy[targetRow][targetCol].troops < 0) boardCopy[targetRow][targetCol].troops = 0;
        
            if (boardCopy[targetRow][targetCol].troops === 0) boardCopy[targetRow][targetCol].usurper = 'player';
        
            currentState.board = boardCopy;
            currentState.previousAttackers = currentState.selectedAssemblies;
            currentState.selectedAssemblies = [];
            currentState.selectedTarget = [];
            currentState.isAttacking = true;
        
            return currentState;
        };

        case 'RESTORE_PEACE': {
            currentState.isAttacking = false;

            const boardCopy = [...currentState.board];
            for (let assembly of currentState.previousAttackers) {
                const [row, col] = assembly;

                boardCopy[row][col].attackData = { isAttacking: false, numTroops: 0, targetPos: [] };
            };

            currentState.board = boardCopy;

            return currentState;
        };

        default: return currentState;
    };
};

export default gameReducer;