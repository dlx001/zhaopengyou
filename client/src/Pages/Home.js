import { useState, useEffect } from "react";

const Home = () => {
  const [roomId, setRoomId] = useState(null);
  let generateCode = () => {
    let num = new Date().getMilliseconds().toString();
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    while (num.length < 6) {
      let randomIndex = Math.floor(Math.random() * alphabet.length);
      num += alphabet[randomIndex];
    }
    setRoomId(num);
  };

  let findGame = () => {};
  return (
    <div>
      <h1>Zhao Peng You</h1>
      <button onClick={generateCode}>Generate Code</button>
      {roomId && (
        <div>
          <p>Your Room Code</p>
          <h2>{roomId}</h2>
          <p> Share room code with friends to play</p>
          <button>Enter Lobby</button>
        </div>
      )}
      <div>
        <p>Enter a Friends Code</p>
        <form>
          <input></input>
          <button onClick={findGame}>Enter</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
