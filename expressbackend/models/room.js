const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A room must have a name'],
        unique: true,
        trim: true,
        maxlength: [40, 'A room name must have less or equal then 40 characters'],
    },
    description: {
        type: String,
        required: false,
    },

    members: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
    ],
    messages: [
        {
            from: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
            },
            text: {
                type: String,
                required: [true, 'A message must have a text'],
            }
        }],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false,
    },
    admin: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;