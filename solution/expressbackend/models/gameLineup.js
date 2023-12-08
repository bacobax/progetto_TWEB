/**
 * game_lineups(game_lineups_id,game_id,club_id,type,number,player_id,player_name,team_captain,position)

 */

const mongoose = require('mongoose');
const createModel = require('./createModel');
const { LINEUP_TYPES, LINEUP_POSITIONS } = require('../utils/constants');

module.exports = createModel(() => {
  const gameLineupSchema = mongoose.Schema({
    game_id: {
      type: mongoose.Mongoose.Schema.Types.ObjectId,
      ref: 'Game',
      required: true,
    },
    club_id: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: LINEUP_TYPES,
    },
    number: {
      type: Number,
      required: true,
    },
    player_id: {
      type: Number,
      required: true,
    },
    player_name: {
      type: String,
      required: true,
    },
    team_captain: {
      type: Boolean,
      required: true,
    },
    position: {
      type: String,
      required: true,
      enum: LINEUP_POSITIONS,
    },
  });
  return gameLineupSchema;
}, 'GameLineup');
