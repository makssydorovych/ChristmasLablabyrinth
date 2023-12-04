import { moveSnowflake } from "../../../utils/move-snowflakes.js";
import { generateMaze } from "../../../utils/generateMaze.js";
import { placeSnowflakes } from "../../../utils/placeSnowFlakes.js";

export const createLabyrinthGrid = (difficulty) => {
  const rows = 22;
  const cols = 32;
  let grid = Array.from({ length: rows }, (v, rowIndex) =>
    Array.from({ length: cols }, (cell, colIndex) =>
      rowIndex < 2 && colIndex < 6 ? " " : "W",
    ),
  );
  const startPosition = { row: 0, col: Math.floor(Math.random() * cols) };
  const finishPosition = { row: rows - 1, col: cols - 1 };

  grid[startPosition.row][startPosition.col] = " ";
  if (difficulty !== "hard") {
    grid[finishPosition.row][finishPosition.col] = "F";
    grid[finishPosition.row - 1][finishPosition.col] = " ";
    grid[finishPosition.row][finishPosition.col - 1] = " ";
    grid[finishPosition.row - 1][finishPosition.col - 1] = " ";
  }

  generateMaze(grid, startPosition, rows, cols);

  if (difficulty === "hard") {
    placeSnowflakes(grid, startPosition, rows, cols, 6);
  }

  return {
    grid,
    moveSnowflake: difficulty === "hard" ? moveSnowflake : null,
  };
};
