import React from 'react';
import './player-token.module.scss';

const PlayerToken = ({ playerIndex }) => {
    const tokenClass = `player-token player-${playerIndex + 1}`;
    return <div className={tokenClass}></div>;
};

export default PlayerToken;
