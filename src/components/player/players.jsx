import React from 'react';
import s from './players.module.scss';

const Players = ({ names, activePlayerIndex }) => {
    return (
        <>
            <ul>
                {names.map((name, index) => (
                    <li
                        className={`${s.player} ${s[`player-${index + 1}`]} ${
                            index === activePlayerIndex ? s.active : ''
                        }`}
                        key={index}
                    >
                        {name}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Players;
