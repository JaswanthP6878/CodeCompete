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
  socket.on("create_game", (arg) => {
  console.log(arg)
  })
  socket.on('join_game',(data) => {
      const { playerID } = data
      console.log('join-game fired by')
      console.log(socket.id);
  });
});
httpServer.listen(3000);