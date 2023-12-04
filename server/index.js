const express = require("express");
const app = express();
const PORT = 4000;

const http = require("http").createServer(app);
const cors = require("cors");

app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3001",
  },
});

const { Pool } = require("pg");
const client = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "password",
  port: 5432,
});
client.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

const Player = require("./models/player");
let players = [];

socketIO.on("connection", (socket) => {
  console.log(`${socket.id} user just connected!`);

  socket.on("connectionData", (data) => {
    console.log(data.name);
    socket.join(data.room);
    let newPlayer = new Player(socket.id, data.name);
    players.push(newPlayer);
    console.log(players);
    socketIO.to(data.room).emit("joinGame", players);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");

    players = players.filter((player) => player.id !== socket.id);

    socketIO.to(socket.rooms.values().next().value).emit("joinGame", players);
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
