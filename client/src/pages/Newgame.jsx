import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Editor from "../components/editor";
import { io } from "socket.io-client";

function NewGame(){
    const [socket, setSocket] = useState({});

    useEffect(()=>{
        const socket = io('http://localhost:3000')
        socket.on('connect', () => {
            setSocket(socket)
        })
      } 
      ,[])

      return (
        <div className='container mx-5'>
          <Navbar conDetails = {socket}/>
          <div>
            <Editor />
          </div>
        </div>
      )

}

export default NewGame;