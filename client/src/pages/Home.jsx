import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
import { useState } from 'react';
import { useEffect } from 'react';
import socket from '../socket';

function Home() {
    const [player, setPlayer] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        socket.on('connect', () => {
            setPlayer({
                playerID: socket.id
            })
        })
    }, [])

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Code Compete</h1>
                    <p className="py-6">Challenge your friend in a coding duel to decide who amongnst you is the better coder</p>
                    <button className="btn btn-primary mx-2" onClick={() => navigate('/newgame', { state: { player } })}>create game</button>
                    <button className='btn btn-primary mx-2' onClick={() => navigate('/joingame', { state: { player } })}>join game</button>
                </div>
            </div>
        </div>


        // <div>
        //     <h1>Code Compete</h1>
        //     <button onClick={() => navigate('/newgame', {state: {player}})}>new game</button>
        //     <button onClick={() => navigate('/joingame', {state: {player}})}>join game</button>
        // </div>
    );

}

export default Home;