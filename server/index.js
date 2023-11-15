// server.js
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
const Game = require("./models/game");
const Player = require("./models/player");
let players = [];

socketIO.on("connection", (socket) => {
  console.log(`${socket.id} user just connected!`);
  socket.on("join", (room) => {
    socket.join(room);
  });
  socket.on("connectionData", (data) => {
    console.log(data.name);
  });
  let newPlayer = new Player(socket.id, socket);
  newPlayer.onCreate();
  players.push(newPlayer);
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.get("/lobby/:id", (req, res) => {});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
