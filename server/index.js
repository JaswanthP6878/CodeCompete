import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from 'cors';
import { readFileSync } from 'fs'

let Problems = readFileSync('./questions.json');
Problems = JSON.parse(Problems);
// console.log(Problems)

const app = express();
app.use(cors)
// const activePlayers = []
let host = null;
let opp = null;

let winner = null;

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
    origin: '*'
  } 
});

io.on("connection", (socket) => {
  socket.join('game_room')
  socket.on("create_game", (arg) => {
    const { playerid } = arg;
    console.log('game created by', playerid);
    host = playerid;
    console.log('host', host);
  });

  socket.on('join_game',(data) => {
      const { playerID } = data
      opp = playerID;
      console.log('join-game fired by', playerID )
  });
  socket.on('find_player', (data) => {
    const {p1ID} = data
    console.log('p1 id sent => ');
    console.log(p1ID);
    console.log(host);

    if (p1ID === host ){
      console.log('game should start!!');
      var problems = Object.keys(Problems);
      let problem = Problems[problems[Math.floor(problems.length * Math.random())]];
      console.log(problem)
      io.to('game_room').emit("start_game", problem);
    } else {
      console.log('please type correct id!!');
    }
  })

  socket.on('end_game', (data) => {
    winner = data;
    console.log('end_game server')
    io.to('game_room').emit('finish_game', winner);
  })

});

httpServer.listen(3000);