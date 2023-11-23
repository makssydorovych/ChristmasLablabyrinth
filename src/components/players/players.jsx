import s from "./players.module.scss";
import { useSelector } from "react-redux";

const Players = () => {
  const players = useSelector((state) => state.game.players);
  const activePlayerIndex = players.findIndex((player) => player.isActive);
  return (
    <ol className={s.players}>
      {players.map((player, index) => (
        <li
          className={`${s.player} ${s[`player-${index + 1}`]} ${
            index === activePlayerIndex ? s.active : ""
          }`}
          key={index}
        >
          {player.name} {/* Исправлено с name на player.name */}
        </li>
      ))}
    </ol>
  );
};

export default Players;
