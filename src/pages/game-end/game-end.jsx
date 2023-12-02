import Players from "../../components/players/players.jsx";
import s from "./game-end.module.scss";
import {
  resetGame,
  setDiceValue,
  updatePlayer,
} from "../../services/game.slice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const GameEnd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const players = useSelector((state) => state.game.players);
  const handlePlayAgainClick = () => {
    players.forEach((player, index) => {
      const initialPosition = { row: 0, col: index };

      dispatch(
        updatePlayer({
          playerIndex: index,
          isFinished: false,
          isActive: index === 0,
          position: initialPosition,
          snowflakes: 0,
        }),
      );
    });
    dispatch(setDiceValue(0));
    navigate("/game");
  };

  const handleHomeClick = () => {
    dispatch(resetGame());
    navigate("/");
  };
  return (
    <div className={s.gameEnd}>
      <Players />
      <div>
        {" "}
        <button onClick={handleHomeClick}>Home</button>
        <button onClick={handlePlayAgainClick}>Play again</button>
      </div>
    </div>
  );
};

export default GameEnd;
