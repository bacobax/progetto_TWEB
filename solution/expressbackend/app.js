const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const AppError = require('./utils/appError');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const yaml = require('js-yaml');
const fs = require('fs');


const usersRouter = require('./routes/user');
const gameLineupRouter = require('./routes/gameLineup');
const gameEventRouter = require('./routes/gameEvent');
const gameRouter = require('./routes/game');
const appearenceRouter = require('./routes/appearence');
const playerValuationRouter = require('./routes/playerValuation');
const playerRouter = require('./routes/player');
const roomRouter = require('./routes/room');


const globalErrorHandler = require('./controllers/special/errorController');
const cors = require('cors');

const swaggerDefinition = yaml.load(fs.readFileSync('./swaggerDef.yaml', 'utf8'));

const options = {

  swaggerDefinition,
  apis: ["./routes/*.js"],

}

const specs = swaggerJsDoc(options);

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/models/swaggerSchemas', express.static('./models/swaggerSchemas'));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


app.use('/api/users', usersRouter);
app.use('/api/gameLineup', gameLineupRouter);
app.use('/api/gameEvent', gameEventRouter);
app.use('/api/game', gameRouter);
app.use('/api/appearence', appearenceRouter);
app.use('/api/playerValuation', playerValuationRouter);
app.use('/api/player', playerRouter);
app.use("/api/room" , roomRouter);


app.use(function (req, res, next) {
  const err = new AppError(
    `Could not find ${req.originalUrl} in the server`,
    404
  );
  next(err);
});

// error handler
app.use(globalErrorHandler);

module.exports = app;
