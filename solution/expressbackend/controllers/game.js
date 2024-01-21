const Game = require('../models/game');
const GameEvent = require('../models/gameEvent');
const catchAsync = require('../utils/catchAsync');

const {createOne, getAll, deleteAll, deleteOne, getOne, updateOne} = require('./special/handlerFactory');
const AppError = require("../utils/appError");
const {ObjectId} = require("mongodb");

exports.createGame = createOne(Game);

exports.getAllGame = getAll(Game);

exports.deleteAllGame = deleteAll(Game);

exports.deleteGame = deleteOne(Game);

/**
 * @function getOneGame
 * @description This function is an express middleware that retrieves a single game document from the database by its ID, enriches it with additional statistics derived from its events, and sends it as a response.
 * @param {Object} req - The express request object.
 * @param {Object} res - The express response object.
 * @param {Function} next - The express next function.
 * @returns {void}
 */
exports.getOneGame = catchAsync(async (req, res, next) => {

    // Extract the game ID from the request parameters
    const id = req.params.id;

    // Fetch the game document from the database by its ID and populate its events
    const doc = await Game.findById(id).populate({
        path: "events",
    })

    // If no document is found, return an error
    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }

    // Filter the events of the game that are of type "Cards"
    const eventsWithCards = doc.events.filter(e => e.type === "Cards");

    // Calculate the total number of cards, yellow cards, and red cards
    const cards = {
        total: eventsWithCards.length,
        yellow: eventsWithCards.filter(e => e.description.toLowerCase().includes("yellow")).length,
        red: eventsWithCards.filter(e => e.description.toLowerCase().includes("red")).length,
    }

    // Calculate the number of goals, substitutions, and shootouts
    const goals = doc.events.filter(e => e.type === "Goals").length;
    const substitutions = doc.events.filter(e => e.type === "Substitutions").length;
    const shootout = doc.events.filter(e => e.type === "Shootout").length;

    // Create a new document that includes the original document and the calculated statistics
    const newDoc= {
        ...doc._doc,
        cards,
        goals,
        substitutions,
        shootout,
    }

    // Send the new document as a response
    res.status(200).json({
        status: 'success',
        data: newDoc,
    });
})
/**
 * @function getEvents
 * @description This function is an express middleware that retrieves a paginated list of game events for a specific game from the database. It also provides a URL for the next page of results.
 * @param {Object} req - The express request object. The game ID should be provided as a parameter, and the page and limit for pagination should be provided as query parameters.
 * @param {Object} res - The express response object. The response will include the status, the data (an array of game events), the URL for the next page of results, and a boolean indicating whether there are more results to fetch.
 * @param {Function} next - The express next function.
 * @throws {Error} Throws an error if the page or limit parameters are less than or equal to 0.
 * @returns {void}
 */
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

