import React, {useContext, useState, useEffect} from 'react';
import { MainContext } from '../contexts/MainContext';
import Score from './Score';
import './../assets/Game.css'

let local_matrix    = [];
let rand_row        = null;
let rand_column     = null;

let past_rand_row        = null;
let past_rand_column     = null;

const Game = () => {
    const {
        user, 
        settingTypes, 
        setGameState, 
        setMessage,
        setScore,
        score,
        setWinners,
        winners
    } = useContext(MainContext);
    const {field, delay} = settingTypes[user.gameType];
    let count = 1;
    
    const [matrix, setMatrix] = useState(() => {
        let matrix = [];
        for(let i = 0; i < field; i++)
        {
            matrix[i] = [];
            for(let j = 0; j < field; j++)
                matrix[i][j] = 0;
        }
        return matrix;
    });

    const setMatrixValue = (i, j, value) => {
        local_matrix[i][j] = value;
        setMatrix(local_matrix.map(row => {return row.map(column => {return column})}));
    }

    const submitWinner = (data) => 
    {
        fetch('https://starnavi-frontend-test-task.herokuapp.com/winners', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',},
            body:  JSON.stringify(data)
        })
        .then(response => response)
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const pickRandomItem = () => 
    {
        rand_row      = Math.floor(Math.random() * field);
        rand_column   = Math.floor(Math.random() * field);

        if(local_matrix[rand_row][rand_column] !== 0) pickRandomItem(true);
        else setMatrixValue(rand_row, rand_column, 1);
        
        return true;
    }

    const handleClick = (i, j) => 
    {
        let new_score = score;
        new_score.player++;
        setScore(new_score);
        setMatrixValue(i, j, 2);
    }

    const getFormatedDate = () =>
    {
        var d = new Date();
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return d.getHours() + ":" + d.getMinutes() + " " + d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
    }

    const newWinner = (name) => 
    {
        let new_winners = winners;
        let current_date = getFormatedDate();
        new_winners.unshift({"id": Math.random(), "winner": name, "date": current_date});
        submitWinner({"winner": name, "date": current_date});
        setWinners(new_winners);
    }
    
    const getColumnColor = (state) => 
    {
        switch(state) {
            case 0: return "#f1f1f1";
            case 1: return "#4A84EF9a";
            case 2: return "#1EC888";
            case 3: return "#F92E479a";
            default: return "#f1f1f1";
        }
    }

    useEffect(()  => {
        local_matrix = matrix.map(row => {return row.map(column => {return column})})
        
        pickRandomItem();
        past_rand_row = rand_row;
        past_rand_column = rand_column;

        const interval = setInterval(() => {
            if(count !== field*field)
                pickRandomItem();

            if(past_rand_row != null && local_matrix[past_rand_row][past_rand_column] === 1) 
            {
                let new_score = score;
                new_score.computer++;
                setScore(new_score);
                setMatrixValue(past_rand_row, past_rand_column, 3);
            }
            
            if(count === field*field)
            {
                clearInterval(interval);
                setGameState(2);
                
                if(score.player > score.computer)
                {
                    newWinner(user.name);
                    setMessage("Congratulations. You (" + user.name + ") won Computer ! :)");
                }
                else if(score.player < score.computer)
                {
                    newWinner("Computer");
                    setMessage("Oh, Sad story. Computer won You (" + user.name + ") ! :(");
                }
                else
                {
                    newWinner("Standoff");
                    setMessage("Hmm, You (" + user.name + ") even Computer!");
                }
                
            }
            past_rand_row = rand_row;
            past_rand_column = rand_column;
            count++;
        }, delay);
        return () => clearTimeout(interval);
    }, []);
    
    return (
        <div id="game">
            {
                matrix.map((row, key) => (
                    <div className="row" key={"row_" + key}>
                        {
                            row.map((coulmn, c_key) => (
                                <div  
                                    className="column" 
                                    key={"row_" + key + "_" + "column_" + c_key}
                                    style={{
                                        width: 450/field + "px", 
                                        height: 450/field + "px",
                                        backgroundColor: getColumnColor(coulmn),
                                        cursor: coulmn === 1 && "pointer"
                                    }}
                                    onClick={() => {coulmn === 1 && handleClick(key, c_key)}}
                                ></div>
                            ))
                        }
                    </div>
                ))
            }
            <Score />
        </div>
    );
}

export default Game;
