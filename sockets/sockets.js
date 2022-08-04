class Sockets {
  constructor(io) {
    this.io = io;
    this.socketsEvents();
  }
  socketsEvents() {
    this.io.on("connection", (socket) => {
      console.log("nuevo cliente conectado");
      socket.on("action-ship", (action) => {
        console.log(action);
        this.io.emit("move-ship", {
          code: action.code,
          prev: action.prev,
          go: action.go,
        });
      });
    });
  }
}
module.exports = Sockets;
