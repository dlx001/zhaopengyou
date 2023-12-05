import React, { useState, useEffect } from "react";

const Lobby = ({
  roomId,
  setHome,
  setLobby,
  setRoomID,
  socket,
  players,
  setPlayers,
  setGame,
}) => {
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
  useEffect(() => {
    const handleGameStarted = () => {
      setLobby(false);
      setGame(true);
    };

    socket.on("gameStarted", handleGameStarted);

    return () => {
      socket.off("gameStarted", handleGameStarted);
    };
  }, [socket]);

  let startGame = () => {
    socket.emit("startGame", { roomId });
    setLobby(false);
    setGame(true);
  };
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
      <button onClick={startGame}>Start Game</button>
    </div>
  );
};

export default Lobby;
