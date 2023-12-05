export const calculatePossibleMoves = (playerPosition, diceValue, grid) => {
  if (!grid || grid.length === 0 || !grid[0]) {
    return [];
  }
  const moves = [];
  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  const queue = [
    {
      row: playerPosition.row,
      col: playerPosition.col,
      stepsRemaining: diceValue,
    },
  ];
  while (queue.length > 0) {
    const { row, col, stepsRemaining } = queue.shift();

    if (
      row < 0 ||
      row >= grid.length ||
      col < 0 ||
      col >= grid[0].length ||
      grid[row][col] === "W"
    ) {
      continue; // Skip invalid positions
    }

    if (!moves.some((move) => move.row === row && move.col === col)) {
      moves.push({ row, col });
    }

    if (stepsRemaining > 0) {
      directions.forEach(([dx, dy]) => {
        queue.push({
          row: row + dx,
          col: col + dy,
          stepsRemaining: stepsRemaining - 1,
        });
      });
    }
  }
  return moves;
};
