const express = require("express");
var cors = require("cors");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const randomMessages = require("./utils/randomMessages");
const path = require("path");

// habilitamos cors
app.use(cors());

// hay que incluir en el home de la app la carpeta client
app.use("/", express.static(path.resolve(__dirname, "../client")));

// iniciamos una conexión para escuchar al cliente
io.on("connection", function (socket) {
  console.log("new websocket connection open");

  // mensaje de bienvenida
  socket.emit(
    "server_message",
    "¡Bienvenido estamos en una conexión TCP para enviar y recibir mensajes!"
  );

  // este canal va a escuchar los mensajes del cliente
  socket.on("listen_client", function (text) {
    console.log(`client says: "${text}"`);
    socket.emit("server_message", `Recibi tu mensaje: "${text}"`);
  });

  // emitimos un mensaje en el canal server_message
  // un mensaje con un cierto intervalo de tiempo
  setInterval(function () {
    console.log("sending message to client");
    socket.emit("server_message", randomMessages());
  }, 3000);
});

// iniciamos el servidor
server.listen(8080, function () {
  console.log("server listen in http://localhost:8080");
});
