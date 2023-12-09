/**
 * games(game_id,competition_id,season,
 * round,date,home_club_id,away_club_id,
 * home_club_goals,away_club_goals,home_club_position,
 * away_club_positions,stadium,attendance,referee,
 * url,home_club_formation,away_club_formation,aggregate,
 * competition_type)
 */

const mongoose = require('mongoose');

const {
  COMPETITION_TYPES,
  aggregateValidation,
} = require('../utils/constants');

const gameSchema = mongoose.Schema(
  {
    competition_id: {
      type: String,
      required: true,
    },
    season: {
      type: String,
      required: [true, 'Season is required'],
    },
    round: {
      type: String,
      required: [true, 'Round is required'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    home_club_id: {
      type: Number,
      required: [true, 'Home club id is required'],
    },
    away_club_id: {
      type: Number,
      required: [true, 'Away club id is required'],
    },
    home_club_goals: {
      type: Number,
      required: [true, 'Home club goals is required'],
    },
    away_club_goals: {
      type: Number,
      required: [true, 'Away club goals is required'],
    },
    home_club_position: {
      type: Number,
      required: false,
      default: -1,
    },
    away_club_position: {
      type: Number,
      required: false,
      default: -1,
    },

    stadium: {
      type: String,
      required: false,
      default: '',
    },
    attendance: {
      type: Number,
      required: false,
      default: -1,
    },
    referee: {
      type: String,
      default: '',
      required: false,
    },
    url: {
      type: String,
      required: [true, 'Url is required'],
    },
    home_club_formation: {
      type: String,
      default: '',
      required: false,
    },
    away_club_formation: {
      type: String,
      default: '',
      required: false,
    },
    home_club_name: {
      type: String,
      required: false,
      default: '',
    },
    away_club_name: {
      type: String,
      required: false,
      default: '',
    },
    aggregate: {
      type: String,
      required: [true, 'Aggregate is required'],
      validate: aggregateValidation,
    },
    competition_type: {
      type: String,
      required: [true, 'Competition type is required'],
      enum: COMPETITION_TYPES,
    },
  },
  {
    timestamps: true,

    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

gameSchema.virtual('events', {
  ref: 'GameEvent',
  foreignField: 'game_id',
  localField: '_id',
});

gameSchema.pre(/find/, function (next) {
  this.populate({
    path: 'events',
  });
  next();
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
