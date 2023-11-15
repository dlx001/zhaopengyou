import { useState, useEffect } from "react";
import io from "socket.io-client";
const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} = require("unique-names-generator");

const Home = () => {
  let roomId = null;
  let [name, setName] = useState("");
  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  let generateCode = () => {
    let num = new Date().getMilliseconds().toString();
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    while (num.length < 6) {
      let randomIndex = Math.floor(Math.random() * alphabet.length);
      num += alphabet[randomIndex];
    }
    roomId = num;
  };
  let createGame = () => {
    const socket = io("localhost:4000");
    socket.on("connect", async () => {
      if (name === "") {
        name = uniqueNamesGenerator({
          dictionaries: [adjectives, colors, animals],
        });
      }
      socket.emit("connectionData", { name });
      generateCode();
      window.location.href = `./lobby/${roomId}`;
    });
    socket.on("yourId", (data) => {
      console.log("playerId was " + data);
    });
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
          <input></input>
          <button>Enter</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
