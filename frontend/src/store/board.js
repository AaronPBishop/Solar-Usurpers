import generateRandomBoard from "../functions/generateRandomBoard";

const initialState = {
    board: []
};

// ACTION CREATORS
export const generateBoard = () => {
    return { type: 'GENERATE_BOARD' };
};

// MAIN REDUCER
const boardReducer = (state = initialState, action) => {
    const currentState = { ...state };

    switch (action.type) {
        case 'GENERATE_BOARD': {
            currentState.board = generateRandomBoard();

            return currentState;
        };

        default: return currentState;
    };
};

export default boardReducer;