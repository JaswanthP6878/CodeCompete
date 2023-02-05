import Navbar from "../components/Navbar";
import Editor from "../components/editor";
import { useLocation } from "react-router-dom";
import { useEffect,useState } from "react";
import socket from '../socket';

function NewGame(){
    const {state} = useLocation()
    const [Waiting, setWaiting] = useState(false)
    const [question, setQuestion] = useState({})
    
    useEffect(() => {
      console.log(socket)
      socket.emit('create_game',{playerid: socket.id})

      socket.on('start_game', (data) => {
        setQuestion(data)
        setWaiting(true);
      });
    }, []);

      return (
        <div className='container mx-5'>
          <Navbar playerid = {socket.id}/>
          <div>
            {Waiting === false ?         
              <h3> Waiting for players to join</h3> 
            : <Editor question = {question} /> }
          </div>
        </div>
      )

 } 

export default NewGame;