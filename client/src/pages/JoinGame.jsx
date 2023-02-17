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
  const [question, setQuestion] = useState({})

  useEffect(()=>{
    socket.on('start_game', (data) => {
      setQuestion(data)
      setWaiting(true)
    })
  }, []); // important to add the square brackets in order for the effect to load only once

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
              <div className="flex flex-col justify-center items-center">
              <label className="text-2xl" htmlFor="id">Enter Session id to join</label>
              <input className="input input-sm  input-bordered w-full max-w-sm mt-3" type="text" value={inputID} onChange = {handleInputChange} name="playerID" id="ID" />
              <button className="btn btn-primary mt-3" onClick={handleClick}>Find Player</button>
            </div> 
            : <Editor question = {question} /> }
          </div>
        </div>
      )
}

export default JoinGame;