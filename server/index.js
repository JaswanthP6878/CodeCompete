import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from 'cors';

const app = express();
app.use(cors)

const activePlayers = {}
const host = {}
const opp = {}


const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
    origin: '*'
  } 
});

io.on("connection", (socket) => {
  socket.on("create_game", (arg) => {
    console.log(arg); // world
  })
    socket.emit('p2_joined','123455');
});



httpServer.listen(3000);