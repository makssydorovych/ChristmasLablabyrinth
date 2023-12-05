export const generateMaze = (grid, current, rows, cols) => {
  const stack = [];
  const visited = new Set(`${current.row},${current.col}`);

  function isValidCell(row, col) {
    return row >= 0 && row < rows && col >= 0 && col < cols;
  }

  function getUnvisitedNeighbors(row, col) {
    const neighbors = [];
    const directions = [
      [2, 0], // Вверх
      [0, 2], // Вправо
      [-2, 0], // Вниз
      [0, -2], // Влево
    ];

    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;

      if (isValidCell(newRow, newCol) && !visited.has(`${newRow},${newCol}`)) {
        neighbors.push({ row: newRow, col: newCol });
      }
    }

    return neighbors;
  }

  function carvePassage(current, next) {
    const wallRow = (current.row + next.row) / 2;
    const wallCol = (current.col + next.col) / 2;

    grid[wallRow][wallCol] = " ";
    grid[next.row][next.col] = " ";
    visited.add(`${next.row},${next.col}`);
  }

  stack.push(current);
  grid[current.row][current.col] = " ";

  while (stack.length > 0) {
    const currentCell = stack[stack.length - 1];
    const unvisitedNeighbors = getUnvisitedNeighbors(
      currentCell.row,
      currentCell.col,
    );

    if (unvisitedNeighbors.length === 0) {
      stack.pop();
    } else {
      const nextCell =
        unvisitedNeighbors[
          Math.floor(Math.random() * unvisitedNeighbors.length)
        ];
      carvePassage(currentCell, nextCell);
      stack.push(nextCell);
    }
  }
};
