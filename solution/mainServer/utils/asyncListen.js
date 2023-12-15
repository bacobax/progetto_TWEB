/**
* @param {Object} server - The server to listen on
* @param {number} port - The port to listen on
* @returns {Promise<void>}
*/

module.exports = asyncListen = (server, port) =>
  new Promise((resolve, reject) => {
    server.listen(port, (err) => {
        if(err) {
            reject(err)
        }else{
            resolve();
        }
    });
  });
