const Player = require('../models/player');
const catchAsync = require('../utils/catchAsync');

const {createOne, getAll, deleteAll, deleteOne, getOne, updateOne} = require('./special/handlerFactory');
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");

exports.createPlayer = createOne(Player);

/**
 * @function getEvents
 * @description This function is an express middleware that retrieves a paginated list of game events for a specific game from the database. It also provides a URL for the next page of results.
 * @param {Object} req - The express request object. The game ID should be provided as a parameter, and the page and limit for pagination should be provided as query parameters.
 * @param {Object} res - The express response object. The response will include the status, the data (an array of game events), the URL for the next page of results, and a boolean indicating whether there are more results to fetch.
 * @param {Function} next - The express next function.
 * @throws {Error} Throws an error if the page or limit parameters are less than or equal to 0.
 * @returns {void}
 */
exports.getAllPlayer = catchAsync(async (req, res) => {
    if(req.query.market_value_in_eur){
        let market_value_in_eur;
        try{
            market_value_in_eur = JSON.parse(req.query.market_value_in_eur);

        }catch(e){
            console.error(e);
            market_value_in_eur = req.query.market_value_in_eur;
        }
        req.query.market_value_in_eur = market_value_in_eur;
    }

    const features = new APIFeatures(Player.find(), {...req.query }).filter().limitFields()

    let query = features.query;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;

    // Handling boundary conditions
    if (page <= 0 || limit <= 0) {
        throw new Error('Invalid pagination parameters');
    }

    const skip = (page - 1) * limit;

    query = query.sort({market_value_in_eur: -1}).skip(skip).limit(limit)

    const docs = await query;
    const nextRequestURL = `${process.env.MAIN_SERVER_HOST}/api/player?page=${page + 1}&limit=${limit}`;

    res.status(200).json({
        status: 'success',
        data: docs,
        nextRequestURL,
    });
});

exports.deleteAllPlayer = deleteAll(Player);

exports.deletePlayer = deleteOne(Player);
/**
 * @function getByName
 * @description This function is an express middleware that retrieves a list of players from the database whose first name or last name matches the provided name. The name is case-insensitive.
 * @param {Object} req - The express request object. The name should be provided as a parameter.
 * @param {Object} res - The express response object. The response will include the status and the data (an array of players with their IDs, first names, and last names).
 * @returns {void}
 */
exports.getByName = catchAsync(async (req, res) => {
    const name = req.params.name;

    const first_name_query = {first_name: {$regex: name, $options: 'i'}};
    const last_name_query = {last_name: {$regex: name, $options: 'i'}};

    const query = {$or: [first_name_query, last_name_query]};


    const docs = await Player.find(query).select('_id first_name last_name');

    res.status(200).json({
        status: 'success',
        data: docs,
    });

});

/**
 * This function calculates and returns the total statistics from a player's appearances.
 * The statistics include total goals, assists, yellow cards, red cards, and minutes played.
 *
 * @param {Array} appearances - The array of appearances of a player.
 * @returns {Object} - An object containing the total goals, assists, yellow cards, red cards, and minutes played.
 */
const statsFromAppearances = (appearances) => {
    const goals = appearances.reduce((acc, curr) => acc + Number(curr.goals), 0);
    const assists = appearances.reduce((acc, curr) => acc + Number(curr.assists), 0);
    const yellow_cards = appearances.reduce((acc, curr) => acc + Number(curr.yellow_cards), 0);
    const red_cards = appearances.reduce((acc, curr) => acc + Number(curr.red_cards), 0);
    const minutes_played = appearances.reduce((acc, curr) => acc + Number(curr.minutes_played), 0);

    return {
        goals,
        assists,
        yellow_cards,
        red_cards,
        minutes_played,
    }
}

/**
 * This function generates a function that calculates and stores statistics for each competition.
 * The statistics are calculated based on the appearances of a player in each competition.
 *
 * @param {Object} obj - The object where the statistics for each competition will be stored.
 * @param {Array} appearances - The array of appearances of a player.
 * @returns {Function} - The function that calculates and stores the statistics for a given competition.
 */
const statsFromAppearancesForeachCompetition = (obj, appearances) =>{
    return (competition_id) => {
        // Filter the appearances for the current competition
        const appearancesInThatCompetition = appearances.filter(a => a.competition_id === competition_id);

        // Initialize the statistics for the current competition
        obj[competition_id] = {}

        // Calculate and store the total goals for the current competition
        obj[competition_id].goals = appearancesInThatCompetition.reduce((acc, curr) => acc + Number(curr.goals), 0);

        // Calculate and store the total assists for the current competition
        obj[competition_id].assists = appearancesInThatCompetition.reduce((acc, curr) => acc + Number(curr.assists), 0);

        // Calculate and store the total yellow cards for the current competition
        obj[competition_id].yellow_cards = appearancesInThatCompetition.reduce((acc, curr) => acc + Number(curr.yellow_cards), 0);

        // Calculate and store the total red cards for the current competition
        obj[competition_id].red_cards = appearancesInThatCompetition.reduce((acc, curr) => acc + Number(curr.red_cards), 0);

        // Calculate and store the total minutes played for the current competition
        obj[competition_id].minutes_played = appearancesInThatCompetition.reduce((acc, curr) => acc + Number(curr.minutes_played), 0);

        obj[competition_id].appearances = appearancesInThatCompetition.length;
    }
}

/**
 * @function getOnePlayer
 * @description This function is an express middleware that retrieves a player document from the database by its ID, enriches it with additional statistics derived from its appearances, and sends it as a response. It also populates the player's valuations, lineups, appearances, and game events.
 * @param {Object} req - The express request object. The player ID should be provided as a parameter.
 * @param {Object} res - The express response object. The response will include the status and the data (the player document enriched with additional statistics).
 * @param {Function} next - The express next function.
 * @throws {AppError} Throws an AppError if no player document is found with the provided ID.
 * @returns {void}
 */
exports.getOnePlayer = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const doc = await Player.findById(id)
        .populate('valuations')
        .populate('lineups')
        .populate('appearances')
        .populate('gameEvents');
    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }

    const {valuations, lineups, appearances,gameEvents, ...playerFields} = doc;

    const {goals, assists, yellow_cards, red_cards, minutes_played} = statsFromAppearances(appearances);

    const market_values_in_eur = valuations.map(v => ({
        market_value_in_eur: v.market_value_in_eur,
        date: v.date,
    }))


    const appearancesCompetitions = new Set(appearances.map(a => a.competition_id));
    const appearancesCompetitionsCount = {};

    appearancesCompetitions.forEach(statsFromAppearancesForeachCompetition(appearancesCompetitionsCount, appearances));


    const lineupsPositions = new Set(lineups.map(l => l.position));
    /**
     * Now foreach position, count how many times the player played in that position
     */
    const lineupsCount = {};
    lineupsPositions.forEach(position => {
        lineupsCount[position] = lineups.filter(l => l.position === position).length;
    })

    //const gamesPlayed = [...new Set(appearances.map(a => a.game_id))];




    const responseDoc = {
        ...(playerFields._doc),
        stats: appearancesCompetitionsCount,
        lineupsCount,
        totalStats: {
            goals,
            assists,
            yellow_cards,
            red_cards,
            minutes_played,
        },
        market_values_in_eur,
        gameEvents
    }



    res.status(200).json({
        status: 'success',
        data: responseDoc,
    });
});

exports.updatePlayer = updateOne(Player);

/**
 * @function clubsTotalMarketValue
 * @description This function is an express middleware that retrieves the total market value of each club by aggregating the market values of all players in each club. The club ID is used as the grouping key.
 * @param {Object} req - The express request object.
 * @param {Object} res - The express response object. The response will include the status and the data (an array of objects, each containing a club ID and the total market value of the club).
 * @returns {void}
 */
exports.clubsTotalMarketValue = catchAsync(async (req, res) => {
    const docs = await Player.aggregate([{
        $group: {
            _id: '$current_club_id',
            totalMarketValue: {$sum: '$market_value_in_eur'},
        },
    }]);
    res.status(200).json({
        status: 'success',
        data: docs,
    });
});
/**
 * @function getAllNationalities
 * @description This function is an express middleware that retrieves a list of all unique nationalities of players in the database.
 * @param {Object} req - The express request object.
 * @param {Object} res - The express response object. The response will include the status and the data (an array of unique nationalities).
 * @returns {void}
 */
exports.getAllNationalities = catchAsync(async (req, res) => {
       const docs = await Player.find().select("country_of_citizenship -_id");
        res.status(200).json({
            status: 'success',
            data: [... new Set(docs.map(d => d.country_of_citizenship))]
        });
})


/**
 * @function getMinMaxMarketValue
 * @description This function is an express middleware that retrieves the minimum and maximum market values of players in the database.
 * @param {Object} req - The express request object.
 * @param {Object} res - The express response object. The response will include the status and the data (an object containing the minimum and maximum market values).
 * @returns {void}
 */
exports.getMinMaxMarketValue = catchAsync(async (req, res) => {
    const docs = await Player.aggregate([{
        $group: {
            _id: null,
            min: {$min: '$market_value_in_eur'},
            max: {$max: '$market_value_in_eur'},
        },
    }]);
    res.status(200).json({
        status: 'success',
        data: docs[0],
    });
})