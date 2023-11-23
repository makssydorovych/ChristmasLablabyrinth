import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Dice = () => {
    const players = useSelector((state) => state.game.players);
    const activePlayerIndex = players.findIndex(player => player.isActive);
    const activePlayer = players[activePlayerIndex];
    const [isDiceActive, setIsDiceActive] = useState(false);
    const [diceValue, setDiceValue] = useState(1);

    useEffect(() => {
        if (activePlayer) {
            setIsDiceActive(true);
        }
    }, [activePlayer]);

    const handleRollDice = () => {
        if (isDiceActive) {
            const newValue = Math.ceil(Math.random() * 6); // Генерация числа от 1 до 6
            setDiceValue(newValue);
            setIsDiceActive(false); // Деактивация кубика после броска
        }
    };

    const diceColor = activePlayerIndex >= 0 ? `var(--color-player-${activePlayerIndex + 1})` : 'grey';

    return (
        <div>
            {isDiceActive && (
                <button
                    style={{ backgroundColor: diceColor }}
                    onClick={handleRollDice}>
                    Roll Dice
                </button>
            )}
            <p>Dice Value: {diceValue}</p>
        </div>
    );
};

export default Dice;
