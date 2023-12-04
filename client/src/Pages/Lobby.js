import React, { useState, useEffect } from "react";

const Lobby = ({ roomId, setHome, setLobby, setRoomID, socket }) => {
  const [players, setPlayers] = useState([{ name: "test" }]);

  useEffect(() => {
    const handleJoin = (data) => {
      setPlayers(data);
      console.log(players);
    };

    socket.on("joinGame", handleJoin);

    return () => {
      socket.off("joinGame", handleJoin);
    };
  }, [socket]);

  let returnHome = () => {
    setHome(true);
    setLobby(false);
    setRoomID(null);
  };

  return (
    <div>
      <p>This is the Lobby for {roomId}</p>
      {players.map((player) => (
        <h1 key={player.id}>{player.name}</h1>
      ))}
      <button onClick={returnHome}>Return Home</button>
    </div>
  );
};

export default Lobby;
