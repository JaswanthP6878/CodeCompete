import Navbar from "../components/Navbar";
import Editor from "../components/editor";
import { useLocation } from "react-router-dom";
import socket from "../socket";
import { useEffect } from "react";
import { useState } from "react";

function JoinGame(){
  const {state} = useLocation()
  const [inputID, setinputID] = useState('')
  const [Waiting, setWaiting] = useState(false)

  useEffect(()=>{
    socket.on('start_game', (data) => {
      setWaiting(true)
    })
  }, []); /// important to add the square brackets in order for the effect to load only once

  const handleInputChange = (e) =>{
    setinputID(e.target.value);
  }

  const handleClick = (e) => {
    if (inputID === ''){
      alert('please host player ID');
    } else  {
      socket.emit('find_player', {p1ID: inputID} )
    }
  }

      return (
        <div className='container mx-5'>
           <Navbar playerid = {state.player.playerID}/>
          <div>
          {Waiting === false ?         
              <div>
              <label htmlFor="id">Enter player 2 ID</label>
              <input type="text" value={inputID} onChange = {handleInputChange} name="playerID" id="ID" />
              <button onClick={handleClick}>Find Player</button>
            </div> 
            : <Editor /> }
          </div>
        </div>
      )
}

export default JoinGame;