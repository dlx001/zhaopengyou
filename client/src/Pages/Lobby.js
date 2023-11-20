import React from "react";

const Lobby = ({ roomId, setHome, setLobby, setRoomID }) => {
  let returnHome = () => {
    setHome(true);
    setLobby(false);
    setRoomID(null);
  };
  return (
    <div>
      <p>This is the Lobby for {roomId}</p>
      <button onClick={returnHome}>return Home</button>
    </div>
  );
};

export default Lobby;
