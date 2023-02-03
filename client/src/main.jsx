import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App'
import Home from './pages/Home';
import NewGame from './pages/Newgame';
import JoinGame from './pages/JoinGame';
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element = {<Home />}/>
      {/* <Route path='/app' element = {<App />}/> */}
      <Route path='/newgame' element = {<NewGame />}/>
      <Route path='/joingame' element = {<JoinGame />}/>
    </Routes>
  </BrowserRouter>
)
