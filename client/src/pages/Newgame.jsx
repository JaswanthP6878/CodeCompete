import Navbar from "../components/Navbar";
import Editor from "../components/editor";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import socket from '../socket';

function NewGame() {
  const { state } = useLocation()
  const [Waiting, setWaiting] = useState(false)
  const [question, setQuestion] = useState({})

  useEffect(() => {
    console.log(socket)
    socket.emit('create_game', { playerid: socket.id })

    socket.on('start_game', (data) => {
      setQuestion(data)
      setWaiting(true);
    });
  }, []);

  return (
    <div className='container mx-5'>
      <Navbar playerid={socket.id} />
          {Waiting === false ?
            <div>
              <div className="flex flex-col justify-center items-center">
                <h5 className="text-xl text-bold">Session ID:</h5>
                <h5 className="text-2xl">{socket.id}</h5>
              </div>
              <div className="flex flex-col justify-center items-center my-8">
                <h3 className="text-2xl"> Waiting for player 2 to join</h3>
                <progress className="progress w-52"></progress>
              </div>
            </div>
            : <Editor question={question} />}
    </div>
  )

}

export default NewGame;