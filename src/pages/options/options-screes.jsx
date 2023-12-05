import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPlayer,
  setDifficulty,
  updatePlayer,
} from "../../services/game.slice.js";
import Players from "../../components/players/players.jsx";
import { useNavigate } from "react-router-dom";
import s from "./options-screen.module.scss";
import { motion } from "framer-motion";

const OptionsScreen = () => {
  const [playerName, setPlayerName] = useState("");
  const players = useSelector((state) => state.game.players);
  const navigate = useNavigate();
  const [inputError, setInputError] = useState("");
  const dispatch = useDispatch();
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const handleDifficultyChange = (e) => {
    const newDifficulty = e.target.value;
    setSelectedDifficulty(newDifficulty);
    dispatch(setDifficulty(newDifficulty));
  };
  const handleAddPlayer = () => {
    if (playerName.trim().length > 20) {
      setInputError("Name must be less than 20 characters.");
      return;
    }
    if (playerName.trim().length == 0) {
      setInputError("Enter player name.");
      return;
    }

    if (playerName.trim()) {
      dispatch(addPlayer({ name: playerName }));
      setPlayerName("");
      setInputError("");
    }

    if (players.length === 6) {
      alert("Maximum amount of players");
    }
  };
  const handleStartGame = () => {
    if (players.length >= 1) {
      dispatch(updatePlayer({ playerIndex: 0, isActive: true }));
      navigate("/game");
    } else {
      setInputError("Enter player name.");
      return;
    }
  };

  return (
    <div className={s.optionsScreen}>
      <div className={s.optionsScreenItems}>
        <div className={s.optionsScreenInputForm}>
          <input
            className={s.optionsScreenInput}
            type="text"
            placeholder="Enter player name"
            value={playerName}
            onChange={(e) => {
              setPlayerName(e.target.value);
              if (inputError) setInputError("");
            }}
          />
          {inputError && <div className={s.inputError}>{inputError}</div>}{" "}
        </div>
        <motion.button
          className={s.optionsScreenButton}
          onClick={handleAddPlayer}
          whileTap={{ scale: 0.8 }}
        >
          Add Player
        </motion.button>
        <motion.button
          className={s.optionsScreenButton}
          onClick={handleStartGame}
          whileTap={{ scale: 0.8 }}
        >
          Start Game
        </motion.button>
        <div className={s.difficulty}>
          <select
            id="difficulty"
            value={selectedDifficulty}
            onChange={handleDifficultyChange}
          >
            <option value="easy">Easy</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>
      <Players />
    </div>
  );
};

export default OptionsScreen;
