const Room = require('../models/room');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');

const {createOne, getAll, deleteAll, deleteOne, getOne, updateOne} = require('./special/handlerFactory');
const AppError = require("../utils/appError");
/**
 * @function createRoom
 * @description This function is an express middleware that creates a new room with the provided name and description, and the logged-in user as the admin. If a room with the same name already exists, it returns an error.
 * @param {Object} req - The express request object. The user object should be attached to the request object, and the name and description of the room should be provided in the request body.
 * @param {Object} res - The express response object. If the room is created successfully, the response will include the status and the data (the newly created room document).
 * @param {Function} next - The express next function.
 * @throws {AppError} Throws an AppError if a room with the same name already exists.
 * @returns {void}
 */
exports.createRoom = catchAsync(async (req, res, next) => {
    const user = req.user;
    const name = req.body.name;
    const description = req.body.description;

    const doc = new Room({
        name: name,
        admin: user.id,
        description: description,
    });
    try{
        await doc.save();

    }catch(e){
        return next(new AppError("A room with this name already exists", 400));
    }

    res.status(201).json({
        status: 'success',
        data: doc,
    });

});

exports.getAllRoom = getAll(Room);

exports.deleteAllRoom = deleteAll(Room);

exports.deleteRoom = deleteOne(Room);

exports.getOneRoom = getOne(Room);

exports.updateRoom = updateOne(Room);
/**
 * @function getAllUserRoom
 * @description This function is an express middleware that retrieves all rooms that the logged-in user is a member of. It populates the names of the members and the senders of the messages in each room.
 * @param {Object} req - The express request object. The user object should be attached to the request object.
 * @param {Object} res - The express response object. The response will include the status and the data (an array of room documents).
 * @param {Function} next - The express next function.
 * @throws {AppError} Throws an AppError if no room documents are found with the logged-in user as a member.
 * @returns {void}
 */
exports.getAllUserRoom = catchAsync(async (req, res, next) => {
    const userID = req.user.id;


    const doc = await Room.find({members: userID}).populate({
        path: "messages.from",
        select: "name"
    }).populate({
        path: "members",
        select: "name"
    });
    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: doc,
    });
});
/**
 * @function newMessage
 * @description This function is an express middleware that adds a new message to a room from the logged-in user. If the room does not exist or the user is not a member of the room, it returns an error.
 * @param {Object} req - The express request object. The user object and the text of the message should be attached to the request object, and the room ID should be provided as a parameter.
 * @param {Object} res - The express response object. If the message is added successfully, the response will include the status and the data (the updated room document).
 * @param {Function} next - The express next function.
 * @throws {AppError} Throws an AppError if no room document is found with the provided ID or the user is not a member of the room.
 * @returns {void}
 */
exports.newMessage = catchAsync(async (req, res, next) => {
    const user = req.user;
    const roomID = req.params.roomID;
    const room = await Room.findById(roomID);

    if (!room) {
        return next(new AppError('No document found with that ID', 404));
    }

    if(!room.members.includes(user._id)){
        return next(new AppError('You are not a member of this room', 404));
    }

    room.messages.push({
        from: user._id,
        text: req.body.text
    });
    await room.save();
    res.status(200).json({
        status: 'success',
        data: room,
    });
});


/**
 * @function joinRoom
 * @description This function is an express middleware that adds the logged-in user to a room. If the room does not exist or the user is already a member of the room, it returns an error.
 * @param {Object} req - The express request object. The user object should be attached to the request object, and the room ID should be provided as a parameter.
 * @param {Object} res - The express response object. If the user is added successfully, the response will include the status and the data (the updated room document).
 * @param {Function} next - The express next function.
 * @throws {AppError} Throws an AppError if no room document is found with the provided ID or the user is already a member of the room.
 * @returns {void}
 */
exports.joinRoom = catchAsync(async (req, res, next) => {
    const user = req.user;
    const roomID = req.params.roomID;

    const room = await Room.findById(roomID);

    if (!room) {
        return next(new AppError('No document found with that ID', 404));
    }

    if(room.members.includes(user._id)){
        return next(new AppError('You are already a member of this room', 404));
    }

    room.members.push(user._id);

    await room.save();

    res.status(200).json({
        status: 'success',
        data: room,
    });


})
/**
 * @function search
 * @description This function is an express middleware that retrieves a list of rooms whose name contains the provided name and the logged-in user is not a member of. The name is case-insensitive.
 * @param {Object} req - The express request object. The user object should be attached to the request object, and the name should be provided as a parameter.
 * @param {Object} res - The express response object. The response will include the status and the data (an array of room documents).
 * @param {Function} next - The express next function.
 * @returns {void}
 */
exports.search = catchAsync(async (req, res, next) => {
    const userID = req.user._id;
    // name of the room has to contain the name passed in the url and the user has not to be a member of the room
    const name_query = {name: {$regex: req.params.name, $options: 'i'} , members: {$ne: userID}};
    const docs = await Room.find(name_query).select('_id name description');
    res.status(200).json({
        status: 'success',
        data: docs,
    });
})
/**
 * @function leaveRoom
 * @description This function is an express middleware that removes the logged-in user from a room. If the room does not exist or the user is not a member of the room, it returns an error. If the room has no members after the user is removed, it deletes the room.
 * @param {Object} req - The express request object. The user object should be attached to the request object, and the room ID should be provided as a parameter.
 * @param {Object} res - The express response object. If the user is removed successfully, the response will include the status and the data (the updated room document or null if the room was deleted).
 * @param {Function} next - The express next function.
 * @throws {AppError} Throws an AppError if no room document is found with the provided ID or the user is not a member of the room.
 * @returns {void}
 */
exports.leaveRoom = catchAsync(async (req, res, next) => {
    const userID = req.user._id;
    const roomID = req.params.roomID;

    const result = await Room.updateOne(
        { _id: roomID },
        { $pull: { members: userID } }
    );

    if (result.nModified === 0) {
        return next(new AppError('No document found with that ID or user not found in members', 404));
    }

    const room = await Room.findById(roomID);

    if (!room) {
        return next(new AppError('No document found with that ID', 404));
    }

    if (room.members.length === 0) {
        await Room.deleteOne({ _id: roomID });

        res.status(200).json({
            status: 'success',
            data: null,
        });
    }else{
        res.status(200).json({
            status: 'success',
            data: room,
        });
    }
});
