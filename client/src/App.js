import socketIO from "socket.io-client";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Lobby from "./Pages/Lobby";
//const socket = socketIO.connect("http://localhost:4000");

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home></Home>} />
        <Route path="/lobby/:id" element={<Lobby></Lobby>} />
      </Routes>
    </Router>
  );
}

export default App;
