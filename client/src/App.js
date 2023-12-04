import socketIO from "socket.io-client";
import { useState, useEffect } from "react";
import Home from "./Pages/Home";
import Lobby from "./Pages/Lobby";
const socket = socketIO.connect("http://localhost:4000");

function App() {
  const [isHome, setHome] = useState(true);
  const [isLobby, setLobby] = useState(false);
  const [roomId, setRoomID] = useState("");
  const [name, setName] = useState("");
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
          socket={socket}
          setHome={setHome}
          setLobby={setLobby}
          setRoomID={setRoomID}
          roomId={roomId}
          name={name}
          setName={setName}
        ></Lobby>
      )}
    </div>
  );
}

export default App;
