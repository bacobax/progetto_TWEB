/**
 * create the schema for the following relation:
 * game_events(game_event_id,date,game_id,minute,type,club_id,player_id,description (nullable),player_in_id (nullable),player_assist_id(nullable))
 */

const mongoose = require('mongoose');

const gameEventSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  game_id: {
    type: mongoose.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
  minute: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['Cards', 'Goals', 'Substitutions', 'Shootout'],
  },
  club_id: {
    type: Number,
    required: true,
  },
  player_id: {
    type: Number,
    required: true,
  },
  description: String,
  player_in_id: {
    type: Number,
    default: -1,
  },
  player_assist_id: {
    type: Number,
    default: -1,
  },
});
const GameEvent = mongoose.model('GameEvent', gameEventSchema);

module.exports = GameEvent;
