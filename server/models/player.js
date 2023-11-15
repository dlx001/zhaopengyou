class Player {
  constructor(id, socket) {
    this.socket = socket;
    this.level = 2;
    this.id = id;
  }
  onCreate() {
    this.socket.emit("yourId", this.id);
  }
}

module.exports = Player;
