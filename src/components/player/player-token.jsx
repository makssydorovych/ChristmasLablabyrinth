import PropTypes from "prop-types";
import s from "./player-token.module.scss";

const PlayerToken = ({ playerIndex }) => {
  const tokenClass = `${s.playerToken} ${s["player-" + (playerIndex + 1)]}`;
  return <div className={tokenClass}>1</div>;
};

PlayerToken.propTypes = {
  playerIndex: PropTypes.number.isRequired,
};

export default PlayerToken;
