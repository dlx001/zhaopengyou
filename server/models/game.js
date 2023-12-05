class Game {
  constructor(id, players) {
    this.id = id;
    this.players = players;
    console.log("A new game has been created");
  }

  emitMessage(message) {
    this.socket.emit("message", message);
  }
}

module.exports = Game;
