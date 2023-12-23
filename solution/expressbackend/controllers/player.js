const Player = require('../models/player');
const catchAsync = require('../utils/catchAsync');

const {createOne, getAll, deleteAll, deleteOne, getOne, updateOne} = require('./special/handlerFactory');
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");

exports.createPlayer = createOne(Player);

exports.getAllPlayer = catchAsync(async (req, res) => {
    const features = new APIFeatures(Player.find(), req.query).filter().limitFields();

    let query = features.query;

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
    const nextRequestURL = `${myHOST}/api/player?page=${page + 1}&limit=${limit}`;

    res.status(200).json({
        status: 'success',
        data: docs,
        nextRequestURL,
    });
});

exports.deleteAllPlayer = deleteAll(Player);

exports.deletePlayer = deleteOne(Player);

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

exports.getOnePlayer = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const doc = await Player.findById(id)
        .populate('valuations')
        .populate('lineups')
        .populate('appearances');
    if (!doc) {
        return next(new AppError('No document found with that ID', 404));

    }

    /**
     * Informations required:
     * Assists, Goals, Shootouts, Yellow Cards, Red Cards, Minutes played, actual_market_value_in_eur,
     * List of market values in the past.
     * Goals, Cards and Minutes played are in every appearences' elements virtual property (appearences.goals, appearences.yellow_cards, appearences.red_cards, appearences.minutes_played)
     * Market values are in every valuations' elements virtual property (valuations.market_value_in_eur)
     */
    const {valuations, lineups, appearances, ...playerFields} = doc;


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
    }



    res.status(200).json({
        status: 'success',
        data: responseDoc,
    });
});

exports.updatePlayer = updateOne(Player);
