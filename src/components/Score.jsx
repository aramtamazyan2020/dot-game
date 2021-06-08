import React, {useContext} from 'react';
import { MainContext } from '../contexts/MainContext';
import './../assets/Score.css'
import player from './../assets/images/player.svg';
import computer from './../assets/images/computer.svg';


const Score = () => {
    const {score} = useContext(MainContext);

    return (
        <div id="score">
            <div className="player_score">
                <div className="icon" style={{backgroundImage: "url(" + player + ")"}}></div>
                <div className="field">{score.player}</div>
            </div>
            <div className="computer_score">
                <div className="field">{score.computer}</div>
                <div className="icon" style={{backgroundImage: "url(" + computer + ")"}}></div>
            </div>
        </div>
    );
}

export default Score;
