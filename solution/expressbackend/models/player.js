const mongoose = require('mongoose');
const { POSITIONS } = require('../utils/constants');

const playerSchema = new mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    last_season: { type: String, required: true },
    player_code: { type: String, required: true },
    country_of_birth: { type: String },
    city_of_birth: { type: String },
    country_of_citizenship: { type: String },
    date_of_birth: { type: String },
    sub_position: { type: String },
    position: { type: String, required: true, enum: POSITIONS },
    foot: { type: String },
    height_in_cm: { type: String },
    market_value_in_eur: { type: Number },
    highest_market_value_in_eur: { type: Number },
    contract_expiration_date: { type: String },
    agent_name: { type: String },
    image_url: { type: String, required: true },
    url: { type: String, required: true },
    current_club_id: { type: Number, required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


playerSchema.virtual('valuations', {
  ref: 'PlayerValuation',
  foreignField: 'player_id',
  localField: '_id',
  options: {
    sort: { date: -1 },
  },
});
playerSchema.virtual('lineups', {
  ref: 'GameLineup',
  foreignField: 'player_id',
  localField: '_id',
});

playerSchema.virtual('appearances', {
  ref: 'Appearance',
  foreignField: 'player_id',
  localField: '_id',
});


const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
