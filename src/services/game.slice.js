import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    difficulty: 'easy',
    playerNames: [],
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setDifficulty: (state, action) => {
            state.difficulty = action.payload;
        },
        setPlayerNames: (state, action) => {
            state.playerNames = action.payload;
        },
    },
});

export const { setDifficulty, setPlayerNames } = gameSlice.actions;

export default gameSlice.reducer;
