import React, { useState, useEffect } from "react";

const Game = ({ roomId, setHome, setLobby, setRoomID, socket, players }) => {
  return (
    <div>
      <p>This is the Game for {roomId}</p>
      {players.map((player) => (
        <h1 key={player.id}>{player.name}</h1>
      ))}
    </div>
  );
};

export default Game;
