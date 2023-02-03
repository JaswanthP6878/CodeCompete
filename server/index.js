import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from 'cors';

const app = express();
app.use(cors)

// const activePlayers = []
let host = null;
let opp = null;


const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
    origin: '*'
  } 
});

io.on("connection", (socket) => {
  // socket methods
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
      socket.emit('start_game', 'startsdadsad');

    } else {
      console.log('please type correct id!!');
    }


  })


});


httpServer.listen(3000);