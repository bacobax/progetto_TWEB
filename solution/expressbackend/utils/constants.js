const POSITIONS = ['goalkeeper', 'defender', 'midfielder', 'forward'];
const STATISTICS = {
    goals: Number,
    assists: Number,
    yellowCards: Number,
    redCards: Number,
    minutesPlayed: Number,
    appearances: Number,
    cleanSheets: Number,
    goalsConceded: Number,
    saves: Number
}
const GOALKEEPER_KEYS = ['cleanSheets', 'goalsConceded', 'saves'];
const allKeysExcept = ({keys, obj}) => {
    return Object.keys(obj).map(key => {
        if(!keys.includes(key)) return key;
    })
}
const OTHER_KEYS = allKeysExcept({keys: GOALKEEPER_KEYS, obj: STATISTICS})


module.exports = {
    POSITIONS,
    STATISTICS,
    GOALKEEPER_KEYS,
    OTHER_KEYS
}