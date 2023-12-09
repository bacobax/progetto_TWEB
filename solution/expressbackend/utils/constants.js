const POSITIONS = ['goalkeeper', 'defender', 'midfielder', 'forward'];
/**
 * Represents an object containing statistical categories in a sports game.
 * @typedef {Object} STATISTICS
 * @property {Number} goals - The number of goals.
 * @property {Number} assists - The number of assists.
 * @property {Number} yellowCards - The number of yellow cards.
 * @property {Number} redCards - The number of red cards.
 * @property {Number} minutesPlayed - The number of minutes played.
 * @property {Number} appearances - The number of appearances.
 * @property {Number} cleanSheets - The number of clean sheets.
 * @property {Number} goalsConceded - The number of goals conceded.
 * @property {Number} saves - The number of saves.
 */
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

/**
 * Represents an array of statistical categories related to goalkeepers in a sports game.
 * @constant {string[]} GOALKEEPER_KEYS - The array containing the statistical categories.
 * @example
 * const goalkeeperKeys = ['cleanSheets', 'goalsConceded', 'saves'];
 * console.log(goalkeeperKeys); // Output: ['cleanSheets', 'goalsConceded', 'saves']
 */
const GOALKEEPER_KEYS = ['cleanSheets', 'goalsConceded', 'saves'];
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

const OTHER_KEYS = allKeysExcept({ keys: GOALKEEPER_KEYS, obj: STATISTICS });

const COMPETITION_TYPES = [
  'domestic_cup',
  'domestic_league',
  'international_cup',
  'other',
];

const LINEUP_TYPES = ['starting_lineup', 'substitutes'];

/**
 * Represents an array of lineup positions in a sports game.
 * @type {Array<string>}
 * @example
 * console.log(LINEUP_POSITIONS);
 * //Output: ['Goalkeeper', 'Right-Back', 'Central Midfield', 'Left Winger', 'Attacking Midfield', 'Right Midfield', 'Right Winger', 'Defender', 'Defensive Midfield', 'Left-Back', 'midfield', 'Attack', 'Centre-Back', 'Centre-Forward', 'Second Striker', 'Left Midfield', 'Sweeper']
 */
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
  STATISTICS,
  GOALKEEPER_KEYS,
  OTHER_KEYS,
  COMPETITION_TYPES,
  LINEUP_TYPES,
  LINEUP_POSITIONS,
  getDateWeek,
  aggregateValidation,
};
