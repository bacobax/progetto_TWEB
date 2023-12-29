const Game = require('../models/game');
const GameEvent = require('../models/gameEvent');
const catchAsync = require('../utils/catchAsync');

const {createOne, getAll, deleteAll, deleteOne, getOne, updateOne} = require('./special/handlerFactory');
const AppError = require("../utils/appError");
const {ObjectID, ObjectId} = require("mongodb");

exports.createGame = createOne(Game);

exports.getAllGame = getAll(Game);

exports.deleteAllGame = deleteAll(Game);

exports.deleteGame = deleteOne(Game);

exports.getOneGame = catchAsync(async (req, res, next) => {

    const id = req.params.id;
    const doc = await Game.findById(id).populate({
        path: "events",
    })
    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }

    const eventsWithCards = doc.events.filter(e => e.type === "Cards");

    const cards = {
        total: eventsWithCards.length,
        yellow: eventsWithCards.filter(e => e.description.toLowerCase().includes("yellow")).length,
        red: eventsWithCards.filter(e => e.description.toLowerCase().includes("red")).length,
    }
    const goals = doc.events.filter(e => e.type === "Goals").length;
    const substitutions = doc.events.filter(e => e.type === "Substitutions").length;
    const shootout = doc.events.filter(e => e.type === "Shootout").length;



    const newDoc= {
        ...doc._doc,
        cards,
        goals,
        substitutions,
        shootout,
    }

    res.status(200).json({
        status: 'success',
        data: newDoc,
    });
})

exports.getEvents = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    let query =  GameEvent.find({
        game_id: new ObjectId(id),
    });

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;

    // Handling boundary conditions
    if (page <= 0 || limit <= 0) {
        throw new Error('Invalid pagination parameters');
    }

    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);



    const docs = await query;
    const myHOST = req.protocol + '://' + req.get('host');
    const nextRequestURL = `${process.env.MAIN_SERVER_HOST}/api/game/${id}/events?page=${page + 1}&limit=${limit}`;

    if (!docs) {
        return next(new AppError('No document found with that ID', 404));
    }

    const hasMore = docs.length === limit;

    res.status(200).json({
        status: 'success',
        data: docs,
        nextRequestURL,
        hasMore,
    });
});

exports.updateGame = updateOne(Game);

