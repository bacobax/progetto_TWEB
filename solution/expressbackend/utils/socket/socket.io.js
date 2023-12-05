
const {initChat} = require('./chat');
/**
 * it initializes the socket.io
 * @param io
 */
exports.init = (io) => {
  // preferisco fattorizzare per pote aggiungere altri namespace in futuro magari

  initChat(io)
};
