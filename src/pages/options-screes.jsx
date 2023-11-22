import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addPlayer, updatePlayer} from '../services/game.slice.js';
import Players from "../components/player/players.jsx";
import GameBoard from "./gameBoard/game-board.jsx";
import Dice from "../components/dice/dice.jsx";

const OptionsScreen = () => {
    const [playerName, setPlayerName] = useState('');
    const dispatch = useDispatch();
    const players = useSelector((state) => state.game.players);
    const [gameStarted, setGameStarted] = useState(false);

    const handleAddPlayer = () => {
        if (playerName.trim()) {
            dispatch(addPlayer({ name: playerName }));
            setPlayerName('');
        }
    };

    const handleStartGame = () => {
        if (players.length > 0) {
            dispatch(updatePlayer({ playerIndex: 0, isActive: true }));
            setGameStarted(true);
        }
    };

    return (
        <div>
            <Players names={players.map(player => player.name)} activePlayerIndex={0}/>

            {/* Conditional rendering based on gameStarted */}
            {gameStarted ? (
                <>
                    <Dice />
                    <GameBoard />
                </>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Enter player name"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                    />
                    <button onClick={handleAddPlayer}>Add Player</button>
                    <button onClick={handleStartGame}>Start Game</button>
                </>
            )}
        </div>
    );
};

export default OptionsScreen;
