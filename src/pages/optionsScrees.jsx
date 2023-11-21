import React, { useState } from 'react';

const OptionsScreen = ({ onNamesSelected, onDifficultySelected }) => {
    const [names, setNames] = useState(["", "", "", ""]);
    const [difficulty, setDifficulty] = useState("easy");

    const handleNameChange = (index, name) => {
        const newNames = [...names];
        newNames[index] = name;
        setNames(newNames);
    };

    const handleSubmit = () => {
        onNamesSelected(names);
        onDifficultySelected(difficulty);
    };

    return (
        <div className="name-selection-screen">
            <h2>Введите имена игроков и выберите сложность:</h2>
            {[...Array(4)].map((_, index) => (
                <input
                    key={index}
                    type="text"
                    placeholder={`Игрок ${index + 1}`}
                    value={names[index]}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                />
            ))}
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="easy">Легко</option>
                <option value="hard">Сложно</option>
            </select>
            <button onClick={handleSubmit}>Готово</button>
        </div>
    );
};

export default OptionsScreen;
