import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

// inicializamos una instancia del websocket del lado del cliente
const socket = io.connect("http://localhost:8080", {
  forceNew: true,
});

// son los botones e inputs para ejectutar las tareas de este ejemplo
const messagesList = document.getElementById("messages");
const inputmessage = document.getElementById("message");
const btnSendMessage = document.getElementById("send");
const btnDisconnect = document.getElementById("disconnect");
const btnReconnect = document.getElementById("reconnect");

// añadimos un evento onclick para el buton de enviar mensaje
btnSendMessage.addEventListener("click", sendMesssage, false);

// añadimos un evento onclick para el buton desconectar
btnDisconnect.addEventListener(
  "click",
  function () {
    alert("El socket está desconectado, no habrá comunicación");
    socket.disconnect();
  },
  false
);

// añadimos un evento onclick para el buton reconectar
btnReconnect.addEventListener(
  "click",
  function () {
    console.log("reconnect");
    socket.connect();
  },
  false
);

// añadimos un evento keypress para el
// input pueda enviar el mensaje al presionar Enter
inputmessage.addEventListener(
  "keypress",
  function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMesssage();
    }
  },
  false
);

// método para enviar mensaje
function sendMesssage() {
  const text = inputmessage.value;

  // listar el mensaje enviado
  pushMessages(text, "client");

  // hay que emitir este mensaje al servidor
  socket.emit("listen_client", text);

  // reset input
  inputmessage.value = "";
}

// método para listar los mensajes en pantalla
function pushMessages(msg, from) {
  // crear elemento div
  const el = document.createElement("div");

  // añadir una clase chat para el div
  el.classList.add("chat-message");

  if (from === "server") {
    // añadir html si es mensaje del server
    el.innerHTML = `
        <div class="flex items-end justify-end">
          <div class="flex flex-col space-y-2  max-w-xs mx-2 order-1 items-end">
              <div><span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white">${msg}</span></div>
          </div>
          <img src="https://i.pravatar.cc/150?img=69" alt="Server profile" class="w-6 h-6 rounded-full order-1" />
        </div>`;
  } else {
    // añadir html si es mensaje del cliente
    el.innerHTML = `
    <div class="flex items-end">
      <div class="flex flex-col space-y-2 max-w-xs mx-2 order-2 items-start">
          <div><span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">${msg}</span></div>
      </div>
      <img src="https://i.pravatar.cc/150?img=15" alt="Server profile" class="w-6 h-6 rounded-full order-1" />
    </div>`;
  }

  // push element
  messagesList.appendChild(el);
}

// recibimos al realizar la conexión exitosa
socket.on("connect", () => {
  // este es id de la conexión
  console.log(socket.id);
});

// aquí se podrían notificar el error de la conexión
socket.on("connect_error", () => {
  console.error("Ocurrió un error al conectarse.");
});

// escuchamos lo que dice el servidor
socket.on("server_message", function (data) {
  pushMessages(data, "server");
});
