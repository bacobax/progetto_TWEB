const {gameLineupSwaggerSchema} = require('./gameLineup');
const {gameSwaggerSchema} = require('./game');
const {playerSwaggerSchema} = require('./player');
const {appearenceSwaggerSchema} = require('./appearence');
const {gameEventSwaggerSchema} = require('./gameEvent');
const {playerValuationSwaggerSchema} = require('./playerValuation');
const {roomSwaggerSchema} = require('./room');
const {userSwaggerSchema} = require('./user');

const schemas = {
    Game : gameSwaggerSchema,
    GameLineup : gameLineupSwaggerSchema,
    Player : playerSwaggerSchema,
    Appearence : appearenceSwaggerSchema,
    GameEvent : gameEventSwaggerSchema,
    PlayerValuation : playerValuationSwaggerSchema,
    Room : roomSwaggerSchema,
    User : userSwaggerSchema,
}

module.exports = schemas;