const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const globalErrorMiddleware = require('./controllers/errorController');
const {getNodeRESTRedirectRouter, getJavaRESTRedirectRouter, getNodeServerUrl, getJavaServerUrl} = require("./utils/options");
const catchAsync = require("./utils/catchAsync");
const {search} = require("./controllers/search");
const axios = require("axios");
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const yaml = require('js-yaml');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const swaggerDefinition = yaml.load(fs.readFileSync('./swaggerDef.yaml', 'utf8'));

const options = {

    swaggerDefinition,
    apis: ["./routes/*.js"],

}

const specs = swaggerJsDoc(options);

app.use('/models/swaggerSchemas', express.static('./models/swaggerSchemas'));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


app.use(express.static(path.join(__dirname, 'public')));

/**
 * Express.js route handler for fetching player data by ID.
 * If the ID is "clubsMarketValue" or "nationalities", it passes control to the next middleware.
 * Otherwise, it fetches the player data from the Node server and the club data from the Java server.
 * It also fetches the competition names for the player's stats and adds them to the stats.
 * Finally, it sends a response with the player data and the club name.
 *
 * @param {Object} req - The Express.js request object.
 * @param {Object} res - The Express.js response object.
 * @param {Function} next - The next middleware function in the Express.js request-response cycle.
 */
app.route("/api/player/:id").get(catchAsync(async (req,res,next)=>{
    if(["clubsMarketValue", "nationalities"].includes(req.params.id)){
        return next();
    }
    const expressResponse = await axios.get(getNodeServerUrl(`/api/player/${req.params.id}`));

    const {current_club_id, ...otherPlayerData} = expressResponse.data.data;

    const javaResponse = await axios.get(getJavaServerUrl(`/api/club/${current_club_id}`));
    const clubName = javaResponse.data.name;

    const competitionsIDS = Object.keys(otherPlayerData.stats);

    const competitionNamesMappingRes = await axios.post(getJavaServerUrl("/api/competitions/names"),competitionsIDS);
    const competitionNamesMapping = competitionNamesMappingRes.data;
    competitionsIDS.forEach(competitionID=>{
        otherPlayerData.stats[competitionID] = {
            ...otherPlayerData.stats[competitionID],
            competitionName: competitionNamesMapping.find(c => c.competition_id === competitionID).name
        };
    })

    res.status(200).json({
        status: "success",
        data: {
            ...otherPlayerData,
            clubName
        }
    })
}));

/**
 * Express.js route handler for fetching club data by ID.
 * It fetches the club data from the Java server and the players data from the Node server.
 * It adds the players data to the club data and sends a response with the club data.
 *
 * @param {Object} req - The Express.js request object.
 * @param {Object} res - The Express.js response object.
 * @param {Function} next - The next middleware function in the Express.js request-response cycle.
 */
app.route("/api/club/:id").get(catchAsync(async (req,res,next)=>{

    const javaResponse = (await axios.get(getJavaServerUrl(`/api/club/${req.params.id}`))).data;
    const clubID = javaResponse.clubId;
    const expressResponse = await axios.get(getNodeServerUrl(`/api/player?current_club_id=${clubID}&fields=first_name,last_name,position,date_of_birth,country_of_citizenship,market_value_in_eur,contract_expiration_date`))
    javaResponse.players = expressResponse.data.data;
    res.status(200).json({
        status: "success",
        data: javaResponse
    })

}));


app.use("/api/player", getNodeRESTRedirectRouter());
app.use("/api/appearence", getNodeRESTRedirectRouter());
app.use("/api/club", getJavaRESTRedirectRouter());
app.use("/api/room" , getNodeRESTRedirectRouter());
app.use("/api/competitions", getJavaRESTRedirectRouter());
app.use("/api/game", getNodeRESTRedirectRouter());
app.use("/api/gameEvent"    , getNodeRESTRedirectRouter());
app.use("/api/users"    , getNodeRESTRedirectRouter());
app.use("/api/playerValuation"    , getNodeRESTRedirectRouter());
app.use("/api/gameLineup"    , getNodeRESTRedirectRouter());
app.get("/api/search/:text",search);

app.use(globalErrorMiddleware);

module.exports = app;
