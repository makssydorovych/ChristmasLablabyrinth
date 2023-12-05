import s from "./players.module.scss";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Snowflake from "../../assets/images/snowflake.jsx";

const Players = ({ onlyActive }) => {
  const players = useSelector((state) => state.game.players);
  const difficulty = useSelector((state) => state.game.difficulty);
  const activePlayerIndex = players.findIndex(
    (player) => player.isActive && !player.isFinished,
  );

  return (
    <ol className={s.players}>
      {onlyActive ? (
        activePlayerIndex !== -1 && !players[activePlayerIndex].isFinished ? (
          <li
            className={`${s.player} ${s[`player-${activePlayerIndex + 1}`]} ${
              s.active
            }`}
            key={players[activePlayerIndex].name}
          >
            {difficulty === "hard" ? (
              <div className={s.playerWithSnowFlakes}>
                {players[activePlayerIndex].name}

                <Snowflake />
                <div className={s.snowflakes}>
                  {players[activePlayerIndex].snowflakes}
                </div>
              </div>
            ) : (
              <div>{players[activePlayerIndex].name}</div>
            )}
          </li>
        ) : null
      ) : (
        players.map((player, index) => (
          <li
            className={`${s.player} ${s[`player-${index + 1}`]} ${
              index === activePlayerIndex ? s.active : ""
            }`}
            key={player.name}
          >
            {player.name}
          </li>
        ))
      )}
    </ol>
  );
};

Players.propTypes = {
  onlyActive: PropTypes.bool,
};

Players.defaultProps = {
  onlyActive: false,
};

export default Players;
