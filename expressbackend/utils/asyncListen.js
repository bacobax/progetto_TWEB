module.exports = asyncListen = (server, port) =>
  new Promise((resolve, reject) => {
    server.listen(port, () => {
      resolve();
    });
  });
