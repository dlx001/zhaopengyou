import React from "react";
import { useParams } from "react-router-dom";

const Lobby = () => {
  const { id } = useParams();
  return <p>This is the Lobby for {id}</p>;
};

export default Lobby;
