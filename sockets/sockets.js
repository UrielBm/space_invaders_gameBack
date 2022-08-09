class Sockets {
  constructor(io) {
    this.io = io;
    this.socketsEvents();
  }
  socketsEvents() {
    this.io.on("connection", (socket) => {
      console.log(`sesion de socket iniciada id del socket: ${socket.id}`);
      socket.on("session", ({ sessionGame }) => {
        console.log(`id del juego y del control}: ${sessionGame}`);
        // creando una sala de socket
        socket.join(sessionGame);
      });
      socket.on("action-ship", (data) => {
        //escuchando las instrucciones del control
        console.log(data);
        // emitiendo un evento al id de la session del juego y del control
        this.io.to(data.sessionGame).emit("move-ship", data);
      });
    });
  }
}
module.exports = Sockets;

// socket.on("action-ship", (action) => {
//   console.log(action);
//   this.io.to(idgame).emit("move-ship", (data) => {
//     console.log(data);
//   });
// });
