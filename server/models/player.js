class Player {
  constructor(id, name) {
    this.level = 2;
    this.id = id;
    this.name = name;
  }
  onCreate() {
    this.socket.emit("yourId", this.id);
  }
}

module.exports = Player;
