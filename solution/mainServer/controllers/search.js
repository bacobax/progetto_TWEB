const axios = require('axios');
const {getJavaServerUrl, getNodeServerUrl} = require("../utils/options");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const getClubsByName = async (name) => {
    return axios.get(getJavaServerUrl(`/api/club/name/${name}`));
}

const getPlayersByName = async (name) => {
    return axios.get(getNodeServerUrl(`/api/player/name/${name}`));
}
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