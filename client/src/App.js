import socketIO from "socket.io-client";
import { useState, useEffect } from "react";
const socket = socketIO.connect("http://localhost:4000");

function App() {
  const [messageTest, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    socket.on("yourId", (id) => {
      setUserId(id);
    });
    socket.emit("join", roomNum);
  }, []);

  return (
    <div>
      <p>Hello World!</p>
      {userId && <p>Your ID: {userId}</p>}
      <button>generate Code</button>
      <p>your code is {roomNum}</p>
      <ul>
        {messageTest.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
