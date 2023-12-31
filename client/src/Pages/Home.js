import { useState, useEffect } from "react";
import io from "socket.io-client";
const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} = require("unique-names-generator");

const Home = ({ socket, setHome, setLobby, setRoomID, isLobby, roomId }) => {
  let [name, setName] = useState("");
  const handleInputChange = (event) => {
    setName(event.target.value);
  };
  const handleRoomChange = (event) => {
    setRoomID(event.target.value);
    console.log(roomId);
  };
  let generateCode = () => {
    let num = new Date().getMilliseconds().toString();
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    while (num.length < 6) {
      let randomIndex = Math.floor(Math.random() * alphabet.length);
      num += alphabet[randomIndex];
    }
    setRoomID(num);
  };
  let createGame = () => {
    if (name === "") {
      name = uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
      });
    }
    socket.emit("connectionData", { name, roomId });
    generateCode();
    setHome(false);
    setLobby(true);

    // socket.on("yourId", (data) => {
    //   console.log("playerId was " + data);
    // });
  };
  let joinGame = () => {
    if (roomId === "") {
      return;
    } else if (name === "") {
      name = uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
      });
    }
    socket.emit("connectionData", { name, roomId });
    setHome(false);
    setLobby(true);
  };
  return (
    <div>
      <h1>Zhao Peng You</h1>
      <h1>Enter your Name</h1>
      <input type="text" value={name} onChange={handleInputChange} />
      <button onClick={createGame}>Create New Game</button>
      <div>
        <p>Enter a Friends Code</p>
        <form>
          <input type="text" value={roomId} onChange={handleRoomChange}></input>
          <button onClick={joinGame}>Enter</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
