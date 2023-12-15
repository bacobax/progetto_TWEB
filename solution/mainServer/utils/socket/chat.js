/**
 * it initializes the socket.io
 * @param io
 */
const {findOneRoom, createRoom, deleteRoom} = require("../roomOperations");
exports.initChat = (io) => {
    const chat = io.of('/chat').on('connection', (socket) => {
        try {
            /**
             * it creates or joins a room
             */
            socket.on('create or join', async (roomID, userId) => {

                try{
                    const roomDB = await findOneRoom(roomID);
                    if (!roomDB) {
                        await createRoom({name: roomID, description: roomID, adminUserID: userId});
                    }
                    socket.join(roomID);
                    chat.to(roomID).emit('joined', roomID, userId);
                }catch (e) {
                    console.log({errorSocketCreateOrJoin: e});
                }
            });

            socket.on('chat', function (room, userId, chatText) {
                chat.to(room).emit('chat', room, userId, chatText);
            });


            socket.on('deleteRoom', async (roomID) => {
                try{
                    await deleteRoom(roomID);
                    socket.leave(roomID);
                    chat.to(roomID).emit('roomDeleted', roomID);
                }catch (e) {
                    console.log({errorSocketDeleteRoom: e});
                }
            });

            socket.on('disconnect', function () {
                console.log('someone disconnected');
            });
        } catch (e) {
            console.log({errorSocketTryCatch: e});
        }
    });
};
