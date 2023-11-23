import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlayer } from "../../services/game.slice.js";
import Players from "../../components/player/players.jsx";
import { useNavigate } from "react-router-dom";
import s from "./options-screen.module.scss";

const OptionsScreen = () => {
  const [playerName, setPlayerName] = useState("");
  const dispatch = useDispatch();
  const players = useSelector((state) => state.game.players);
  const navigate = useNavigate();
  const handleAddPlayer = () => {
    if (playerName.trim()) {
      dispatch(addPlayer({ name: playerName }));
      setPlayerName("");
    }
  };
  const handleStartGame = () => {
    if (players.length > 0) {
      navigate("/game");
    }
  };

  return (
    <div className={s.optionsScreen}>
      <Players />
      <input
        className={s.optionsScreenInput}
        type="text"
        placeholder="Enter player name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <button className={s.optionsScreenButton} onClick={handleAddPlayer}>
        Add Player
      </button>
      <button className={s.optionsScreenButton} onClick={handleStartGame}>
        Start Game
      </button>
    </div>
  );
};

export default OptionsScreen;
