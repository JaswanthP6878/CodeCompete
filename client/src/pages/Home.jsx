import {useNavigate} from 'react-router-dom';
import { io } from "socket.io-client";
import { useState } from 'react';
import { useEffect } from 'react';
import socket from '../socket';

function Home() {
    const [player, setPlayer] = useState({});
    const navigate = useNavigate();
    
    useEffect(()=>{
        socket.on('connect', () => {
            setPlayer({
                playerID: socket.id
            })
        })
      }, [])
    
    return (
        <div>
            <h1> Home page</h1>
            <button onClick={() => navigate('/newgame', {state: {player}})}>new game</button>
            <button onClick={() => navigate('/joingame', {state: {player}})}>join game</button>
        </div>
    );

}

export default Home;