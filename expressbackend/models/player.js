const mongoose = require('mongoose');
const { POSITIONS, STATISTICS, GOALKEEPER_KEYS, OTHER_KEYS } = require('../utils/constants');

const keysCheck = ({keys, obj}) => {
    return keys.every(el => {
        return obj.hasOwnProperty(el);
    })
}

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        enum: POSITIONS,
    },
    nationality: String,
    statistics: {
        ...STATISTICS,

        validator: function (obj) {
            
            switch(this.position) {
                case 'goalkeeper':
                    return keysCheck({keys : GOALKEEPER_KEYS, obj})

                case 'defender':
                    return keysCheck({keys : OTHER_KEYS, obj})

                case 'midfielder':
                    return keysCheck({keys : OTHER_KEYS, obj})
                case 'forward':
                    return keysCheck({keys : OTHER_KEYS, obj})
                default:
                    return false;
            }
        }

    },
    team: {
        type: mongoose.Schema.ObjectId,
        ref: 'Team'
    }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;