import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {addPlayer, updatePlayer} from '../services/game.slice.js';
import Players from "../components/player/player.jsx";

const OptionsScreen = () => {
    const [playerName, setPlayerName] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const players = useSelector((state) => state.game.players);

    const handleAddPlayer = () => {
        if (playerName.trim()) {
            dispatch(addPlayer({ name: playerName }));
            setPlayerName(''); // Reset the input field after adding a player
        }
    };

    const handleStartGame = () => {
        console.log("Navigating to /gameBoard");
        if (players.length > 0) {
            dispatch(updatePlayer({ playerIndex: 0, isActive: true }));

            // Additional logic for enabling Dice component goes here


            navigate('/gameBoard');
        }
    };

    return (
        <div>
            <Players names={players.map(player => player.name)}/>
            <input
                type="text"
                placeholder="Enter player name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
            />
            <button onClick={handleAddPlayer}>Add Player</button>
            <button onClick={handleStartGame}>Start Game</button>
        </div>
    );
};

export default OptionsScreen;
