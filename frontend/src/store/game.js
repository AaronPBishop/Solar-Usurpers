import generateRandomBoard from "../functions/generateRandomBoard";

const initialState = {
    board: [],
    selectedAssemblies: [],
    selectedTarget: []
};

// ACTION CREATORS
export const generateBoard = () => {
    return { type: 'GENERATE_BOARD' };
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

// MAIN REDUCER
const gameReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'GENERATE_BOARD': {
            currentState.board = generateRandomBoard();

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

                assembliesCopy.push([action.payload.row, action.payload.col]);
            };

            currentState.selectedAssemblies = assembliesCopy;
            return currentState;
        };

        case 'SET_TARGET': {
            if (!currentState.selectedAssemblies.length) return currentState;

            if (currentState.selectedTarget.length && currentState.selectedTarget[0] === action.payload.row && currentState.selectedTarget[1] === action.payload.col) {
                currentState.selectedTarget = [];
                
                return currentState;
            };

            currentState.selectedTarget = [action.payload.row, action.payload.col];

            return currentState;
        };

        default: return currentState;
    };
};

export default gameReducer;