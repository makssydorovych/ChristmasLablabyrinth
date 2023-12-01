export function moveSnowflake(grid, rows, cols, pickedUpPosition, players) {
  // Remove the picked-up snowflake
  if (pickedUpPosition) {
    grid[pickedUpPosition.row][pickedUpPosition.col] = " ";
  }

  // Create a set of occupied positions
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

  // Generate a new position for the snowflake
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

  // Place the snowflake in the new position
  grid[newSnowflakePosition.row][newSnowflakePosition.col] = "S";

  return grid; // Return the updated grid
}

export const createLabyrinthGrid = (difficulty) => {
  const rows = 22;
  const cols = 32;
  const grid = Array.from({ length: rows }, (v, rowIndex) =>
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
  }

  function generateMaze(grid, current, rows, cols) {
    const stack = [];
    const visited = new Set();

    function isValidCell(row, col) {
      // Проверяем, находится ли клетка в исключенной области 6x6 в левом верхнем углу
      const isExcludedArea = col < 6 && row < 2;

      return (
        row >= 0 &&
        row < rows &&
        col >= 0 &&
        col < cols &&
        !isExcludedArea &&
        !visited.has(`${row},${col}`)
      );
    }
    function getUnvisitedNeighbors(row, col) {
      const neighbors = [];
      const directions = [
        [2, 0], // Вниз
        [0, 2], // Вправо
        [-2, 0], // Вверх
        [0, -2], // Влево
      ];

      for (const [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;

        if (isValidCell(newRow, newCol)) {
          neighbors.push({ row: newRow, col: newCol });
        }
      }

      return neighbors;
    }

    function carvePassage(current, next) {
      const wallRow = current.row + Math.sign(next.row - current.row);
      const wallCol = current.col + Math.sign(next.col - current.col);

      // Avoid carving into the 6x6 excluded area in the top-left corner
      if (wallCol >= 6 || wallRow >= 6) {
        grid[wallRow][wallCol] = " ";
      }

      grid[next.row][next.col] = " ";
      visited.add(`${current.row},${current.col}`);
      visited.add(`${next.row},${next.col}`);
    }

    stack.push(current);

    while (stack.length > 0) {
      const currentCell = stack[stack.length - 1];
      const unvisitedNeighbors = getUnvisitedNeighbors(
        currentCell.row,
        currentCell.col,
      );

      if (unvisitedNeighbors.length === 0) {
        // No unvisited neighbors, backtrack
        stack.pop();
      } else {
        // Choose a random unvisited neighbor
        const nextCell =
          unvisitedNeighbors[
            Math.floor(Math.random() * unvisitedNeighbors.length)
          ];

        carvePassage(currentCell, nextCell);

        // Move to the next cell
        stack.push(nextCell);
      }
    }
  }

  function checkFinishAccessible(grid, start, finish) {
    const visited = new Set();
    const queue = [start];
    const directions = [
      [1, 0], // Вниз
      [0, 1], // Вправо
      [-1, 0], // Вверх
      [0, -1], // Влево
    ];

    while (queue.length > 0) {
      const { row, col } = queue.shift();

      if (row === finish.row && col === finish.col) {
        return true; // Найден доступный путь к финишу
      }

      visited.add(`${row},${col}`);

      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (
          newRow >= 0 &&
          newRow < grid.length &&
          newCol >= 0 &&
          newCol < grid[0].length &&
          grid[newRow][newCol] === " " && // Путь может проходить только через свободные клетки
          !visited.has(`${newRow},${newCol}`)
        ) {
          queue.push({ row: newRow, col: newCol });
          visited.add(`${newRow},${newCol}`);
        }
      }
    }

    return false; // Путь к финишу не найден
  }

  function placeSnowflakes(grid, playerStart, rows, cols, numSnowflakes) {
    for (let i = 0; i < numSnowflakes; i++) {
      let row, col;

      do {
        row = Math.floor(Math.random() * rows);
        col = Math.floor(Math.random() * cols);
      } while (
        grid[row][col] !== " " ||
        (row === playerStart.row && col === playerStart.col) ||
        (col >= 5 && col < 11 && row < 2) // Исключаем область 2x6
      );

      grid[row][col] = "S";
    }
  }

  function createPathToFinish(grid, start, finish, rows, cols) {
    const queue = [{ row: start.row, col: start.col }];
    const visited = new Set();
    const cameFrom = new Map();

    while (queue.length > 0) {
      const { row, col } = queue.shift();

      if (row === finish.row && col === finish.col) {
        // Мы достигли финиша, восстанавливаем путь
        let current = finish;
        while (current.row !== start.row || current.col !== start.col) {
          const key = `${current.row},${current.col}`;
          const prev = cameFrom.get(key);
          grid[current.row][current.col] = " "; // Открываем клетку на пути
          current = { row: prev.row, col: prev.col };
        }
        return;
      }

      const directions = [
        [1, 0], // Вниз
        [0, 1], // Вправо
        [-1, 0], // Вверх
        [0, -1], // Влево
      ];

      for (const [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;

        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          grid[newRow][newCol] === " " &&
          !visited.has(`${newRow},${newCol}`)
        ) {
          queue.push({ row: newRow, col: newCol });
          visited.add(`${newRow},${newCol}`);
          cameFrom.set(`${newRow},${newCol}`, { row, col });
        }
      }
    }
  }

  // Генерация лабиринта
  generateMaze(grid, startPosition, rows, cols);

  // Пример использования:
  // moveSnowflake(grid, rows, cols);

  // Проверка доступности финиша и создание пути, если необходимо
  if (
    difficulty !== "hard" &&
    !checkFinishAccessible(grid, startPosition, finishPosition)
  ) {
    createPathToFinish(grid, startPosition, finishPosition, rows, cols);
  }

  // Размещение снежинок, если сложность "hard"
  if (difficulty === "hard") {
    placeSnowflakes(grid, startPosition, rows, cols, 6);
  }
  // Возвращаем сетку и функцию для перемещения снежинок, если это необходимо
  return {
    grid,
    moveSnowflake: difficulty === "hard" ? moveSnowflake : null,
  };
};
