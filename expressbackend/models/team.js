const mongoose = require('mongoose');
const createModel = require("./createModel");

const Team = createModel(() => {
    const teamSchema =  new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'A team must have a name'],
            unique: true,
            trim: true,

        },
        description: {
            type: String,
            required: false,
        },


    }, {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }

    });

    teamSchema.virtual('players', {
        ref: 'Player',
        foreignField: 'team',
        localField: '_id'
    });
    return teamSchema;

}, "Team");


module.exports = Team;
