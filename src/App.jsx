import React, { useState } from 'react';
import AppRouter from './AppRouter';

const App = () => {
    const [playerNames, setPlayerNames] = useState([]);
    const [difficulty, setDifficulty] = useState('easy');

    const handleNamesSelected = (names) => setPlayerNames(names);
    const handleDifficultySelected = (difficulty) => setDifficulty(difficulty);

    return (
        <AppRouter
            onNamesSelected={handleNamesSelected}
            onDifficultySelected={handleDifficultySelected}
        />
    );
};

export default App;
