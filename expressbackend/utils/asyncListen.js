/**
 * @param {Object} server - The server to listen on
 * @param {number} port - The port to listen on
 * @returns {Promise<void>}
 */

module.exports = asyncListen = (server, port) =>
  new Promise((resolve, _) => {
    server.listen(port, () => {
      resolve();
    });
  });
