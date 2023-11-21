import React, { useState } from 'react';

const Dice = ({ onRoll }) => {
    const [value, setValue] = useState(1);

    const rollDice = () => {
        const newValue = Math.floor(Math.random() * 6) + 1;
        setValue(newValue);
        onRoll(newValue);
    };

    return (
        <div>
            <button onClick={rollDice}>Throw dice</button>
            <p>Number: {value}</p>
        </div>
    );
};

export default Dice;
