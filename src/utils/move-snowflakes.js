export function moveSnowflake(grid, rows, cols, pickedUpPosition, players) {
  if (pickedUpPosition) {
    grid[pickedUpPosition.row][pickedUpPosition.col] = " ";
  }

  const occupiedPositions = new Set(
    players.map((player) => `${player.position.row},${player.position.col}`),
  );

  // Add the current snowflakes to the occupied positions
  grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === "S") {
        occupiedPositions.add(`${rowIndex},${colIndex}`);
      }
    });
  });

  let newSnowflakePosition;
  do {
    newSnowflakePosition = {
      row: Math.floor(Math.random() * rows),
      col: Math.floor(Math.random() * cols),
    };
  } while (
    occupiedPositions.has(
      `${newSnowflakePosition.row},${newSnowflakePosition.col}`,
    )
  );

  grid[newSnowflakePosition.row][newSnowflakePosition.col] = "S";

  return grid;
}
