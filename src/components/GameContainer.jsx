import React, {useContext} from 'react';
import { MainContext } from '../contexts/MainContext';
import Settings from './Settings';
import Message from './Message';
import Game from './Game';
import './../assets/GameContainer.css';

const GameContainer = () => {
    const {gameState} = useContext(MainContext);
    return (
        <div id="gameContainer">
            <div className="content">
                <Settings />
                <Message />
                {(gameState === 1) && <Game />}
            </div>
        </div>
    );
}

export default GameContainer;
