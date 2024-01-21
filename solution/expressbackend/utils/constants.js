const POSITIONS = ['Missing', 'Midfield', 'Attack', 'Defender', 'Goalkeeper'];
const SUB_POSITIONS = ['Attacking Midfield',
  'Central Midfield',
  'Centre-Back',
  'Centre-Forward',
  'Defensive Midfield',
  'Goalkeeper',
  'Left Midfield',
  'Left Winger',
  'Left-Back',
  'Right Midfield',
  'Right Winger',
  'Right-Back',
  'Second Striker'
]


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
 * Returns an array of all the keys in the object that are not present in the input array.
 *
 * @param {Object} options - The options object.
 * @param {Array} options.keys - An array of keys to exclude from the object.
 * @param {Object} options.obj - The object from which to extract the keys.
 * @returns {Array} - An array of keys from the object that are not present in the input array.
 */
const allKeysExcept = ({ keys, obj }) => {
  if (!keys || !obj) {
    throw new Error("Missing 'keys' or 'obj' properties in the options object");
  }
  const keysSet = new Set(keys);
  return Object.keys(obj).filter((key) => {
    return !keysSet.has(key);
  });
};



const COMPETITION_TYPES = [
  'domestic_cup',
  'domestic_league',
  'international_cup',
  'other',
];

const LINEUP_TYPES = ['starting_lineup', 'substitutes'];

/**
 * Checks if a given value matches a specific pattern using a regular expression.
 *
 * @param {string} val - The value to be validated.
 * @returns {boolean} - True if the value matches the pattern, false otherwise.
 */
const aggregateValidation = (val) => {
  const regex = /^\d+:\d+$/;
  return regex.test(val);
};

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
  SUB_POSITIONS,
  COMPETITION_TYPES,
  LINEUP_TYPES,
  LINEUP_POSITIONS,
  getDateWeek,
  aggregateValidation,
};
