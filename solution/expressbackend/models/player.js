const mongoose = require('mongoose');
const {POSITIONS} = require("../utils/constants");

const playerSchema = new mongoose.Schema({
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
  market_value_in_eur: { type: String },
  highest_market_value_in_eur: { type: String },
  contract_expiration_date: { type: String },
  agent_name: { type: String },
  image_url: { type: String, required: true },
  url: { type: String, required: true },
  current_club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' },
});

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;
