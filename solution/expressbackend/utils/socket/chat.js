const Room = require('../../models/room');
/**
 * it initializes the socket.io
 * @param io
 */
exports.initChat = (io) => {
    // the chat namespace
    const chat = io.of('/chat').on('connection', (socket) => {
        try {
            /**
             * it creates or joins a room
             */
            socket.on('create or join', async (roomID, userId) => {

                const roomDB = await Room.findById(roomID);
                if (!roomDB) {
                     await Room.create({
                        name: roomID,
                        admin: userId,
                        members: [userId],
                    });

                }
                if (!roomDB.members.includes(userId)) {
                    roomDB.members.push(userId);
                    await roomDB.save();
                }

                socket.join(roomID);
                chat.to(roomID).emit('joined', roomID, userId);

            });

            socket.on('chat', function (room, userId, chatText) {
                chat.to(room).emit('chat', room, userId, chatText);
            });


            socket.on('deleteRoom', async (roomID) => {
                const roomDB = await Room.findById(roomID);
                if (roomDB) {
                    await roomDB.remove();
                }
                socket.leave(roomID);
                chat.to(roomID).emit('roomDeleted', roomID);
            });

            socket.on('disconnect', function () {
                console.log('someone disconnected');
            });
        } catch (e) {
            console.log({errorSocketTryCatch: e});
        }
    });
};
