/**
 * appareances(appearance_id
 * ,game_id,player_id,player_club_id,player_current_club_id,
 * date,player_name,competition_id,yellow_cards,red_cards,goals,
 * assists,minutes_played)

 */

const mongoose = require('mongoose');
const createModel = require('./createModel');

module.exports = createModel(() => {
  const appearanceSchema = mongoose.Schema({
    game_id: {
      type: mongoose.Mongoose.Schema.Types.ObjectId,
      ref: 'Game',
      required: true,
    },
    player_id: {
      type: Number,
      required: true,
    },
    player_club_id: {
      type: Number,
      required: true,
    },
    player_current_club_id: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    player_name: {
      type: String,
      required: true,
    },
    competition_id: {
      type: Number,
      required: true,
    },
    yellow_cards: {
      type: Number,
      required: true,
    },
    red_cards: {
      type: Number,
      required: true,
    },
    goals: {
      type: Number,
      required: true,
    },
    assists: {
      type: Number,
      required: true,
    },
    minutes_played: {
      type: Number,
      required: true,
    },
  });

  return appearanceSchema;
}, 'Appearance');
