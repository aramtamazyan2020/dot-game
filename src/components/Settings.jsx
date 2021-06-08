import React, {useEffect, useState, useContext} from 'react';
import { MainContext } from '../contexts/MainContext';
import './../assets/Settings.css'


const Settings = () => {
    const {
        settingTypes, 
        setSettingTypes, 
        setMessage,
        setGameState,
        gameState,
        setUser,
        setScore,
        content
    } = useContext(MainContext);
    const [allDataNeeded, setAllDataNeeded] = useState(false);
    const [currentUserData, setCurrentUserData] = useState({
        gameType: "",
        name: ""
    });

    useEffect(() => {
        fetch('https://starnavi-frontend-test-task.herokuapp.com/game-settings', {
            method: 'GET',
            headers: {'Content-Type': 'application/json',},
        })
        .then(response => response.json())
        .then(data => {
            setSettingTypes(data);
            setAllDataNeeded(true);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [setSettingTypes, setAllDataNeeded]);

    const validateUserData = () => {
        if(Object.keys(settingTypes).indexOf(currentUserData.gameType) !== -1 && currentUserData.name !== "")
            return true;
        else
            return false;

    }

    const handlePlayButton = () => {
        if(validateUserData())
        {
            setUser(currentUserData);
            setGameState(1);
            setMessage("Game Started Good luck !");
        }
        else
            setMessage("Please Fill Correct Information !");
    }

    const handlePlayAgainButton = () => {
        if(validateUserData())
        {
            setUser(currentUserData);
            setScore({player: 0, computer: 0});
            setGameState(1);
            setMessage("Game Started Good luck !");
        }
        else
            setMessage("Please Fill Correct Information !");
    }

    const handleResetButton = () => {
            setScore({player: 0, computer: 0});
            setGameState(0);
            setMessage("Fill Information and click on PLAY Button");
    }

    const handleNameChange      = (e) => setCurrentUserData({...currentUserData, name: e.target.value});
    const handleGameModeChange  =(e) => setCurrentUserData({...currentUserData, gameType: e.target.value});

    const renderPlayBtn = () => {
        switch(gameState)
        {
            case 0: return <button onClick={handlePlayButton}>PLAY</button>; 
            case 1: return <button onClick={handleResetButton}>RESET</button>;
            case 2: return <button onClick={handlePlayAgainButton}>PLAY AGAIN</button>;
            default: return <button onClick={handlePlayButton}>PLAY</button>;
        }
    }

    const reanderingSettings = () => {
        return (
                <div className="content">
                    <div className="field">
                        <select disabled={gameState === 1} onChange={handleGameModeChange} value={currentUserData.gameType} id="gameMode">
                            <option>Pick Game Mode</option>
                            {
                                Object.keys(settingTypes).map((key, index) => (
                                    <option value={key} key={index}>{content[key]}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="field">
                        <input disabled={gameState === 1} type="text" onChange={handleNameChange} placeholder="Enter Your name" value={currentUserData.name} id="name"/>
                    </div>
                    <div className="field">
                        {renderPlayBtn()}
                    </div>
                </div>
            );
    }

    const conditionalRendering = allDataNeeded ? reanderingSettings() : <div>Loading ...</div>;    

    
    return (
        <div id="settings">
            {conditionalRendering}
        </div>
    );
    
}

export default Settings;
