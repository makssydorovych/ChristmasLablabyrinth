import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    difficulty: 'easy',
    players: []
};
export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {

        setDifficulty: (state, action) => {
            state.difficulty = action.payload;
        },

        addPlayer: (state, action) => {
            if (state.players.length < 6) {
                state.players.push({
                    name: action.payload.name,
                    position: { row: state.players.length, col: 0 },
                    isActive: false
                });
            }
        },

        updatePlayer: (state, action) => {
            const { playerIndex, name, position, isActive } = action.payload;
            if (state.players[playerIndex]) {
                state.players[playerIndex].name = name ?? state.players[playerIndex].name;
                state.players[playerIndex].position = position ?? state.players[playerIndex].position;
                state.players[playerIndex].isActive = isActive ?? state.players[playerIndex].isActive;
            }
        },

    },
});


export const { setDifficulty, addPlayer, updatePlayer } = gameSlice.actions;


export default gameSlice.reducer;
