import React, {useEffect, useContext, useState} from 'react';
import { MainContext } from './../contexts/MainContext';
import './../assets/Winners.css'

const Winners = () => {
    const {winners, setWinners} = useContext(MainContext);
    const [allDataNeeded, setAllDataNeeded] = useState(true);

    useEffect(() => {
        fetch('https://starnavi-frontend-test-task.herokuapp.com/winners', {
            method: 'GET',
            headers: {'Content-Type': 'application/json',},
        })
        .then(response => response.json())
        .then(data => {
            setWinners(data);
            setAllDataNeeded(true);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [setWinners, setAllDataNeeded]);

    const reanderingWinners = () => {
        return (
                <div className="winners">
                    {
                        winners.map(winner => (
                            <div className="winner" key={winner.id}>
                                <div className="name">{winner.winner}</div>
                                <div className="date">{winner.date}</div>
                            </div>
                        ))
                    }
                </div>
            );
    }

    const conditionalRendering = allDataNeeded ? reanderingWinners() : <div>Loading ...</div>;  

    return (
        <div id="winners">
            <div className="content">
                <h2>Leader Board</h2>
                {conditionalRendering}
            </div>
        </div>
    );
}

export default Winners;
