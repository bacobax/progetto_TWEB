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

app.route("/api/playerStat/:id").get(catchAsync(async (req,res,next)=>{
    const expressResponse = await axios.get(getNodeServerUrl(`/api/player/${req.params.id}`));



    const {current_club_id, ...otherPlayerData} = expressResponse.data.data;




    const javaResponse = await axios.get(getJavaServerUrl(`/api/clubs/${current_club_id}`));
    const clubName = javaResponse.data.name;



    const competitionsIDS = Object.keys(otherPlayerData.stats);



    const competitionNamesMappingRes = await axios.post(getJavaServerUrl("/api/competitions/names"),competitionsIDS);
    const competitionNamesMapping = competitionNamesMappingRes.data;
    competitionsIDS.forEach(competitionID=>{

        console.log({competitionID})


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
app.route("/api/clubStat/:id").get(catchAsync(async (req,res,next)=>{

    const javaResponse = (await axios.get(getJavaServerUrl(`/api/clubs/${req.params.id}`))).data;
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
app.use("/api/clubs", getJavaRESTRedirectRouter());
app.use("/api/room" , getNodeRESTRedirectRouter());
app.use("/api/competitions", getJavaRESTRedirectRouter());
app.use("/api/game", getNodeRESTRedirectRouter());
app.use("/api/gameEvent"    , getNodeRESTRedirectRouter());

app.get("/api/search/:text",search);

app.use(globalErrorMiddleware);

module.exports = app;
