/**
 * player_valuations(player_id,last_season,datetime,
 * date,dateweek,market_value_in_eur,n,current_club_id,
 * player_club_domestic_competition_id)
 */

const mongoose = require('mongoose');
const createModel = require('./createModel');
const { getDateWeek } = require('../utils/constants');

module.exports = createModel(() => {
  const playerValuationSchema = mongoose.Schema(
    {
      player_id: {
        type: Number,
        required: true,
      },
      last_season: {
        type: Number,
        required: true,
      },
      datetime: {
        type: Date,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      dateweek: {
        type: Date,
        required: true,
      },
      market_value_in_eur: {
        type: Number,
        required: true,
      },

      current_club_id: {
        type: Number,
        required: true,
      },
      player_club_domestic_competition_id: {
        type: Number,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
  playerValuationSchema.pre(/save|create/, function (next) {
    this.dateweek = getDateWeek(this.date);
    next();
  });
  return playerValuationSchema;
}, 'GameLineup');
