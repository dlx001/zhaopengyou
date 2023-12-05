import socketIO from "socket.io-client";
import { useState, useEffect } from "react";
import Home from "./Pages/Home";
import Lobby from "./Pages/Lobby";
import Game from "./Pages/Game";
const socket = socketIO.connect("http://localhost:4000");

function App() {
  const [isHome, setHome] = useState(true);
  const [isLobby, setLobby] = useState(false);
  const [isGame, setGame] = useState(false);
  const [roomId, setRoomID] = useState("");
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);
  return (
    <div>
      {isHome && (
        <Home
          socket={socket}
          setHome={setHome}
          setLobby={setLobby}
          setRoomID={setRoomID}
          isLobby={isLobby}
          roomId={roomId}
          name={name}
          setName={setName}
        ></Home>
      )}
      {isLobby && (
        <Lobby
          players={players}
          setPlayers={setPlayers}
          socket={socket}
          setHome={setHome}
          setLobby={setLobby}
          setRoomID={setRoomID}
          roomId={roomId}
          name={name}
          setName={setName}
          setGame={setGame}
        ></Lobby>
      )}
      {isGame && (
        <Game
          players={players}
          socket={socket}
          setHome={setHome}
          setLobby={setLobby}
          roomId={roomId}
          name={name}
          setName={setName}
        ></Game>
      )}
    </div>
  );
}

export default App;
