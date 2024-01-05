/**
 * create the schema for the following relation:
 * game_events(game_event_id,date,game_id,minute,type,club_id,player_id,description (nullable),player_in_id (nullable),player_assist_id(nullable))
 */

const mongoose = require('mongoose');

const gameEventSchema = new mongoose.Schema({
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
    type: mongoose.Types.ObjectId,
    ref: 'Player',
    required: true,
  },
  description: String,
  player_in_id: {
    type: mongoose.Types.ObjectId,
    ref: 'Player',
    required: false,
  },
  player_assist_id: {
    type: mongoose.Types.ObjectId,
    ref: 'Player',
    required: false,
  },
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

gameEventSchema.virtual('player' , {
    ref: 'Player',
    foreignField: '_id',
    localField: 'player_id',
});

gameEventSchema.virtual('player_in' , {
    ref: 'Player',
    foreignField: '_id',
    localField: 'player_in_id',
});

gameEventSchema.virtual('player_assist' , {
    ref: 'Player',
    foreignField: '_id',
    localField: 'player_assist_id',
});

gameEventSchema.virtual('game' , {
    ref: 'Game',
    foreignField: '_id',
    localField: 'game_id',
    justOne:true
});




gameEventSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'player',
        select: 'first_name last_name -_id',
    });
    this.populate({
            path: 'player_in',
            select: 'first_name last_name -_id',
        });
    this.populate({
            path: 'player_assist',
            select: 'first_name last_name -_id',
        });
    this.populate({
        path: 'game',
        select: 'home_club_name away_club_name competition_id -_id',
    });

    next();
});




const GameEvent = mongoose.model('GameEvent', gameEventSchema);

module.exports = GameEvent;
