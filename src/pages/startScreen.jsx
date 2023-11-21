import React from 'react';
import {useNavigate} from "react-router-dom";

const StartScreen = ({ onStart }) => {
    const navigate = useNavigate();
    const handleStart = () => {
        navigate('/options');
    };
    return (
        <div className="start-screen">
            <h1>Welcome</h1>
            <button onClick={handleStart}>Start</button>
        </div>
    );
};

export default StartScreen;
