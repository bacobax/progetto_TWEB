/**
 * it initializes the socket.io
 * @param io
 */
const {findOneRoom, createRoom, deleteRoom} = require("../roomOperations");


exports.initChat = (io) => {
    const chat = io.of('/chat').on('connection', (socket) => {
            console.log('someone connected')
            socket.on('create or join', async (roomID, userId) => {

                try{
                    socket.join(roomID);
                    chat.to(roomID).emit('joined', roomID, userId);
                }catch (e) {
                    console.log({errorSocketCreateOrJoin: e});
                }
            });

            socket.on('chat', function (room, userId, userName, chatText) {
                console.log(`message from ${userId} in room ${room}: ${chatText}`)
                chat.to(room).emit('chat', room, userId, userName, chatText);
            });


            socket.on('deleteRoom', async (roomID) => {
                try{
                    socket.leave(roomID);
                    chat.to(roomID).emit('roomDeleted', roomID);
                }catch (e) {
                    console.log({errorSocketDeleteRoom: e});
                }
            });

            socket.on('disconnect', function () {
                console.log('someone disconnected');
            });
    });
};
