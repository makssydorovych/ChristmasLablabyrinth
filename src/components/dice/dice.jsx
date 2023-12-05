import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDiceValue } from "../../services/game.slice.js";
import s from "./dice.module.scss";
import { motion } from "framer-motion";
import Players from "../players/players.jsx";

const Dice = () => {
  const players = useSelector((state) => state.game.players);
  const diceValue = useSelector((state) => state.game.diceValue);
  const activePlayerIndex = players.findIndex((player) => player.isActive);
  const activePlayer = players[activePlayerIndex];
  const [isDiceActive, setIsDiceActive] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (activePlayer) {
      setIsDiceActive(true);
    }
  }, [activePlayer]);

  const handleRollDice = () => {
    if (isDiceActive) {
      const newValue = Math.ceil(Math.random() * 6);
      dispatch(setDiceValue(newValue));
      setIsDiceActive(false);
    }
  };
  const diceColor =
    activePlayerIndex >= 0
      ? `var(--color-player-${activePlayerIndex + 1})`
      : "grey";
  const displayDiceValue =
    typeof diceValue === "object" ? diceValue.diceValue : diceValue;
  return (
    <div className={s.dice}>
      <Players onlyActive={true} />
      <motion.button
        className={s.diceButton}
        style={{ background: diceColor }}
        onClick={handleRollDice}
        whileTap={{ scale: 0.7 }}
      >
        Roll !!!
      </motion.button>{" "}
      <p className={s.diceValue} style={{ color: diceColor }}>
        {displayDiceValue}
      </p>
    </div>
  );
};

export default Dice;
