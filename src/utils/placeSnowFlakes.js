export const placeSnowflakes = (
  grid,
  playerStart,
  rows,
  cols,
  numSnowflakes,
) => {
  for (let i = 0; i < numSnowflakes; i++) {
    let row, col;

    do {
      row = Math.floor(Math.random() * rows);
      col = Math.floor(Math.random() * cols);
    } while (
      grid[row][col] !== " " ||
      (row === playerStart.row && col === playerStart.col) ||
      (col >= 5 && col < 11 && row < 2)
    );

    grid[row][col] = "S";
  }
};
