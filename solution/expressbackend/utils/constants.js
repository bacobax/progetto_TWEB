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
  saves: Number,
};
const GOALKEEPER_KEYS = ['cleanSheets', 'goalsConceded', 'saves'];
const allKeysExcept = ({ keys, obj }) => {
  return Object.keys(obj).map((key) => {
    if (!keys.includes(key)) return key;
  });
};
const OTHER_KEYS = allKeysExcept({ keys: GOALKEEPER_KEYS, obj: STATISTICS });

const COMPETITION_TYPES = [
  'domestic_cup',
  'domestic_league',
  'international_cup',
  'other',
];

const LINEUP_TYPES = ['starting_lineup', 'substitutes'];

const LINEUP_POSITIONS = [
  'Goalkeeper',
  'Right-Back',
  'Central Midfield',
  'Left Winger',
  'Attacking Midfield',
  'Right Midfield',
  'Right Winger',
  'Defender',
  'Defensive Midfield',
  'Left-Back',
  'midfield',
  'Attack',
  'Centre-Back',
  'Centre-Forward',
  'Second Striker',
  'Left Midfield',
  'Sweeper',
];

/**
 * Takes a date as input and returns a new date object with the time set to the end of the week if the input date falls on a Sunday.
 * @param {string} date - The input date in the format 'YYYY-MM-DD'.
 * @returns {Date} - The modified date object with the time set to the end of the week if the input date falls on a Sunday.
 */
const getDateWeek = (date) => {
  const newDate = new Date(date);
  const day = newDate.getUTCDay() || 7;
  if (day === 7) newDate.setUTCHours(24);
  return newDate;
};

module.exports = {
  POSITIONS,
  STATISTICS,
  GOALKEEPER_KEYS,
  OTHER_KEYS,
  COMPETITION_TYPES,
  LINEUP_TYPES,
  LINEUP_POSITIONS,
  getDateWeek,
};
