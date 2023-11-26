import s from "./players.module.scss";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const Players = ({ onlyActive }) => {
  const players = useSelector((state) => state.game.players);
  const activePlayerIndex = players.findIndex((player) => player.isActive);
  const playerBackgroundClass = s[`player-${activePlayerIndex + 1}`];
  return (
    <ol className={s.players}>
      {onlyActive ? (
        <li
          className={`${s.player} ${playerBackgroundClass} ${s.active}`}
          key={players[activePlayerIndex].name}
        >
          {players[activePlayerIndex].name}
        </li>
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
