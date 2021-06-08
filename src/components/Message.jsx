import React, {useContext} from 'react';
import { MainContext } from '../contexts/MainContext';
import './../assets/Message.css'


const Message = () => {
    const {message} = useContext(MainContext);


    return (
        <div id="message">
            <div className="content" style={{display: message?"block":"none"}}>
                {message}
            </div>
        </div>
    );
}

export default Message;
