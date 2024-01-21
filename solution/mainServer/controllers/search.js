const axios = require('axios');
const {getJavaServerUrl, getNodeServerUrl} = require("../utils/options");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
/**
 * Asynchronously fetches club data by name from the Java server.
 *
 * @param {string} name - The name of the club.
 * @returns {Promise} Axios Promise object representing the HTTP request.
 */
const getClubsByName = async (name) => {
    return axios.get(getJavaServerUrl(`/api/club/name/${name}`));
}

/**
 * Asynchronously fetches player data by name from the Node server.
 *
 * @param {string} name - The name of the player.
 * @returns {Promise} Axios Promise object representing the HTTP request.
 */
const getPlayersByName = async (name) => {
    return axios.get(getNodeServerUrl(`/api/player/name/${name}`));
}

/**
 * Asynchronously searches for clubs and players by a given text.
 *
 * @param {Object} req - The Express.js request object.
 * @param {Object} res - The Express.js response object.
 * @param {Function} next - The next middleware function in the Express.js request-response cycle.
 * @returns {Object} The Express.js response object with the status code and the search results.
 */
exports.search = catchAsync(async (req,res,next) =>{
    const text = req.params.text;
    let clubs;
    let players;
    try{
        clubs = await getClubsByName(text);

    }catch (e) {
        return next(new AppError("Error while searching clubs: " + e.message, 500));
    }

    try{
        players = await  getPlayersByName(text);
    }catch(e){
        return next(new AppError("Error while searching players: " + e.message, 500));
    }

    res.status(200).json({
        status: "success",
        data: {
            clubs: clubs.data.map(c => (
                {
                    clubId:c.clubId ,
                    name: c.name,
                }
            )),
            players: players.data.data.map(p => (
                {
                    playerId: p._id,
                    name:   [p.first_name, p.last_name].filter(Boolean).join(' ')
                }
            ))
        }
    })

})