import React from 'react';
import {MainProvider} from './contexts/MainContext';
import GameContainer from "./components/GameContainer";
import Winners from "./components/Winners";
import './App.css';

const App = () => {
    return (
        <MainProvider>
            <div className="App" >
                <GameContainer />
                <Winners />
            </div>
        </MainProvider>
    );
}

export default App;
