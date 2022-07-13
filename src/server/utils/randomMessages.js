const messages = [
  "Hola soy el servidor, mucho gusto!",
  "Que bueno encontrarte por aquí",
  "Estamos en una conexión TCP, enviando mensajes a través de un canal full-duplex",
  "Hola de nuevo",
  "Con esto puedes crear grandes cosas, ¿No te parece?",
  "Disculpa si repito las cosas",
];

function randomMessages() {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

module.exports = randomMessages;
