import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDiceValue, updatePlayer } from "../../services/game.slice.js";
import s from "./game-board.module.scss";
import PlayerToken from "../../components/player/player-token.jsx";
import Dice from "../../components/dice/dice.jsx";
import { createLabyrinthGrid } from "./labyrinth/labyrinthGrid.jsx"; // Removed unused import
import { useNavigate } from "react-router-dom";
import Modal from "../../components/modal/modal.jsx";
import { calculatePossibleMoves } from "../../utils/calculatePossibleMoves.js";

const GameBoard = () => {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.game.players);
  const activePlayerIndex = players.findIndex((player) => player.isActive);
  const activePlayer = players[activePlayerIndex];
  const diceValue = useSelector((state) => state.game.diceValue);
  const [selectedCell, setSelectedCell] = useState(null);
  const [finishedPlayers, setFinishedPlayers] = useState([]);
  const [showCongratulatoryMessage, setShowCongratulatoryMessage] =
    useState(false);

  const difficulty = useSelector((state) => state.game.difficulty);
  const [labyrinthGrid, setLabyrinthGrid] = useState([]);

  const rows = labyrinthGrid.length;
  const cols = labyrinthGrid[0] ? labyrinthGrid[0].length : 0;
  const navigate = useNavigate();

  useEffect(() => {
    const { grid } = createLabyrinthGrid(difficulty, rows, cols);
    setLabyrinthGrid(grid);
  }, [difficulty, rows, cols]);

  useEffect(() => {
    if (finishedPlayers.length === players.length) {
      navigate("/game-end");
    }
  }, [finishedPlayers, players, navigate]);

  function pickUpSnowflake(playerPosition, grid, player) {
    const { row, col } = playerPosition;

    if (grid[row][col] === "S") {
      grid[row][col] = " ";

      let newSnowflakePosition;
      do {
        newSnowflakePosition = {
          row: Math.floor(Math.random() * rows),
          col: Math.floor(Math.random() * cols),
        };
      } while (
        grid[newSnowflakePosition.row][newSnowflakePosition.col] !== " "
      );
      grid[newSnowflakePosition.row][newSnowflakePosition.col] = "S";

      // Dispatch an action to update the snowflakes count
      const updatedSnowflakesCount = player.snowflakes + 1;
      dispatch(
        updatePlayer({
          playerIndex: activePlayerIndex,
          snowflakes: updatedSnowflakesCount,
        }),
      );

      return {
        updatedGrid: grid,
        updatedPlayer: player,
      };
    }

    return {
      updatedGrid: grid,
      updatedPlayer: player,
    };
  }

  const possibleMoves = useMemo(() => {
    if (activePlayer) {
      return calculatePossibleMoves(
        activePlayer.position,
        diceValue,
        labyrinthGrid,
      );
    }
    return [];
  }, [activePlayer, diceValue, labyrinthGrid]);

  const handleCellClick = (row, col) => {
    const cell = labyrinthGrid[row][col];

    const cellOccupied = players.some(
      (player) =>
        player.position.row === row &&
        player.position.col === col &&
        !player.isFinished &&
        player !== activePlayer,
    );
    const isValidMove = possibleMoves.some(
      (move) => move.row === row && move.col === col,
    );

    if (cell === "W") {
      return;
    }

    if (cell === "F" && isValidMove) {
      finishPlayer(activePlayerIndex);
      return;
    }

    if (labyrinthGrid[row][col] === "S" && isValidMove) {
      const { updatedGrid, updatedPlayer } = pickUpSnowflake(
        { row, col },
        labyrinthGrid,
        activePlayer,
      );

      setLabyrinthGrid(updatedGrid);
      dispatch(updatePlayer(updatedPlayer));
      if (updatedPlayer.snowflakes >= 4) {
        finishPlayer(activePlayerIndex);
      }
    }

    if (isValidMove && !cellOccupied) {
      dispatch(
        updatePlayer({
          playerIndex: activePlayerIndex,
          position: { row, col },
        }),
      );
      setNextActivePlayer();
    }

    setSelectedCell(isValidMove ? null : { row, col });
  };

  const finishPlayer = (playerIndex) => {
    dispatch(
      updatePlayer({
        playerIndex: playerIndex,
        isFinished: true,
      }),
    );
    setShowCongratulatoryMessage(true);
    setFinishedPlayers((prev) => [...prev, players[playerIndex]]);
    setNextActivePlayer();
  };

  const setNextActivePlayer = () => {
    let nextPlayerIndex = findNextActivePlayerIndex();

    if (nextPlayerIndex === activePlayerIndex) {
      dispatch(
        updatePlayer({
          playerIndex: activePlayerIndex,
          isActive: true,
        }),
      );
    } else {
      dispatch(
        updatePlayer({
          playerIndex: nextPlayerIndex,
          isActive: true,
        }),
      );

      dispatch(
        updatePlayer({
          playerIndex: activePlayerIndex,
          isActive: false,
        }),
      );
    }

    dispatch(setDiceValue(0));
  };

  const findNextActivePlayerIndex = () => {
    let nextPlayerIndex = (activePlayerIndex + 1) % players.length;

    while (players[nextPlayerIndex].isFinished) {
      nextPlayerIndex = (nextPlayerIndex + 1) % players.length;
    }

    return nextPlayerIndex;
  };

  const closeCongratulatoryMessage = () => {
    setShowCongratulatoryMessage(false);
  };

  return (
    <div className={s.gameBoard}>
      <div className={s.gameBoardInfo}>
        <Dice />
      </div>
      {finishedPlayers.map((player, index) => (
        <Modal
          key={index}
          playerName={player.name}
          open={showCongratulatoryMessage}
          onClose={closeCongratulatoryMessage}
        />
      ))}
      <div className={s.gameBoardLabyrinth}>
        {labyrinthGrid.map((row, rowIndex) => (
          <div key={rowIndex} className={s.gameRow}>
            {row.map((cell, colIndex) => {
              let cellClass = `${s.gameCell} ${
                cell === "W"
                  ? s.wall
                  : cell === "F"
                  ? s.finishCell
                  : cell === "S"
                  ? s.snowflake
                  : ""
              } ${
                possibleMoves.some(
                  (move) => move.row === rowIndex && move.col === colIndex,
                )
                  ? s.possibleMove
                  : ""
              } ${
                selectedCell &&
                selectedCell.row === rowIndex &&
                selectedCell.col === colIndex
                  ? s.selectedCell
                  : ""
              }`;

              return (
                <div
                  key={colIndex}
                  className={cellClass}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {players.map((player, index) =>
                    player.position.row === rowIndex &&
                    player.position.col === colIndex &&
                    !player.isFinished ? (
                      <PlayerToken key={index} playerIndex={index} />
                    ) : null,
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
