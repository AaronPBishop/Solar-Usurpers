import generateRandomBoard from "../functions/generateRandomBoard";
import getNeighbors from "../functions/getNeighbors";

const initialState = {
    board: [],
    selectedAssemblies: [],
    selectedTarget: []
};

// ACTION CREATORS
export const generateBoard = () => {
    return { type: 'GENERATE_BOARD' };
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

// MAIN REDUCER
const gameReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'GENERATE_BOARD': {
            currentState.board = generateRandomBoard();

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
            };
        
            boardCopy[targetRow][targetCol].troops -= assemblyTroops;
            if (boardCopy[targetRow][targetCol].troops < 0) boardCopy[targetRow][targetCol].troops = 0;
        
            if (boardCopy[targetRow][targetCol].troops === 0) boardCopy[targetRow][targetCol].usurper = 'player';
        
            currentState.board = boardCopy;
            currentState.selectedAssemblies = [];
            currentState.selectedTarget = [];
        
            return currentState;
          };

        default: return currentState;
    };
};

export default gameReducer;