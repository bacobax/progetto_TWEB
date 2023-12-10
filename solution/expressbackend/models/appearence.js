/**
 * appareances(appearance_id
 * ,game_id,player_id,player_club_id,player_current_club_id,
 * date,player_name,competition_id,yellow_cards,red_cards,goals,
 * assists,minutes_played)

 */

const mongoose = require('mongoose');

const appearanceSchema = new mongoose.Schema({
  game_id: {
    type: mongoose.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
  player_id: {
    type: mongoose.Types.ObjectId,
    ref: 'Player',
    required: true,
  },
  player_name: {
    type: String,
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
  competition_id: {
    type: String,
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

// appearanceSchema.pre(/insertMany/, function (next, docs) {
//   docs.forEach((doc) => {
//     doc.game_id = mongoose.Types.ObjectId(doc.game_id);
//   });
//   next();
// });

const Appearance = mongoose.model('Appearance', appearanceSchema);
module.exports = Appearance;
