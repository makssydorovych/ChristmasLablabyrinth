import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlayer, updatePlayer } from "../../services/game.slice.js";
import Players from "../../components/players/players.jsx";
import { useNavigate } from "react-router-dom";
import s from "./options-screen.module.scss";
import { motion } from "framer-motion";

const OptionsScreen = () => {
  const [playerName, setPlayerName] = useState("");
  const dispatch = useDispatch();
  const players = useSelector((state) => state.game.players);
  const navigate = useNavigate();
  const [inputError, setInputError] = useState("");

  const handleAddPlayer = () => {
    if (playerName.trim().length > 20) {
      setInputError("Name must be less than 20 characters.");
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
    if (players.length > 0) {
      dispatch(updatePlayer({ playerIndex: 0, isActive: true }));
      navigate("/game");
    } else {
      alert("Add players name");
    }
  };

  return (
    <div className={s.optionsScreen}>
      <Players />
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
      </div>
    </div>
  );
};

export default OptionsScreen;
