import './App.css'
import Editor from './components/editor'
import Navbar from './components/Navbar'
import { io } from "socket.io-client";
import { useState } from 'react';
import { useEffect } from 'react';

export default function App() {
  const [data, setData] = useState('');
  
  useEffect(()=>{
    const socket = io('http://localhost:3000')
    socket.on('connect', () => {
      setData(socket)
    })
  } 
  ,[])

  return (
    <div className='container mx-5'>
      <Navbar conDetails = {data}/>
      <div>
        <Editor />
      </div>
    </div>
  )
}


