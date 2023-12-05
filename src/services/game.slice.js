import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  difficulty: "easy",
  players: [],
  diceValue: 0,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setDifficulty: (state, action) => {
      state.difficulty = action.payload;
    },
    addPlayer: (state, action) => {
      if (state.players.length < 6) {
        state.players.push({
          name: action.payload.name,
          position: { row: 0, col: state.players.length },
          isActive: false,
          snowflakes: 0,
        });
      }
    },
    updatePlayer: (state, action) => {
      const { playerIndex, position, isActive, isFinished, name, snowflakes } =
        action.payload;
      const player = state.players[playerIndex];
      if (player) {
        player.isFinished = isFinished ?? player.isFinished;
        player.name = name ?? player.name;
        player.position = position ?? player.position;
        player.isActive = isActive ?? player.isActive;
        if (snowflakes !== undefined) {
          player.snowflakes = snowflakes;
        }
      }
    },
    setDiceValue: (state, action) => {
      state.diceValue = action.payload;
    },
    resetGame: (state) => {
      state.players.forEach((player) => {
        player.snowflakes = 0;
      });
    },
  },
});

export const {
  setDifficulty,
  addPlayer,
  updatePlayer,
  setDiceValue,
  resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;
