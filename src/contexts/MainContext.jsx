import React, {useState, createContext} from 'react';

export const MainContext = createContext();

export const MainProvider = (props) => {
    const [content, setcContent] = useState({
        easyMode: "Easy",
        normalMode: "Normal",
        hardMode: "Hard"
    });
    const [user, setUser] = useState({
        gameType: "",
        name: ""
    });
    const [settingTypes, setSettingTypes] = useState({});
    const [message, setMessage] = useState("Fill Information and click on PLAY Button");
    const [gameState, setGameState] = useState(0); // 0 - didn't started, 1 - started, 2 - finished
    const [winners, setWinners] = useState([]);
    const [score, setScore] = useState({
        player: 0,
        computer: 0
    });

    return(
        <MainContext.Provider value={{
            content: content,

            settingTypes: settingTypes,
            setSettingTypes: setSettingTypes,

            message: message,
            setMessage: setMessage,

            gameState: gameState,
            setGameState: setGameState,

            user: user,
            setUser: setUser,

            score: score,
            setScore: setScore,

            winners: winners,
            setWinners: setWinners,
        }}>
            {props.children}
        </MainContext.Provider>
    );
}