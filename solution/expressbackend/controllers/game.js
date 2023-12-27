const Game = require('../models/game');

const catchAsync = require('../utils/catchAsync');

const {createOne, getAll, deleteAll, deleteOne, getOne, updateOne} = require('./special/handlerFactory');

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

    const cards = doc.events.filter(e => e.type === "Cards").length;
    const goals = doc.events.filter(e => e.type === "Goals").length;
    const substitutions = doc.events.filter(e => e.type === "Substitutions").length;
    const shootout = doc.events.filter(e => e.type === "Shootout").length;


    const {events} = doc;

    const newDoc= {
        ...doc._doc,
        cards,
        goals,
        substitutions,
        shootout,
        events

    }

    res.status(200).json({
        status: 'success',
        data: newDoc,
    });
})

exports.updateGame = updateOne(Game);

