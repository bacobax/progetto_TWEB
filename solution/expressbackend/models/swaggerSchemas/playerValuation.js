/**
 * SwaggerUI docs schema for this mongoose schema:
 * {
 *     player_id: {
 *       type: mongoose.Types.ObjectId,
 *       ref: 'Player',
 *       required: true,
 *     },
 *     last_season: {
 *       type: Number,
 *       required: true,
 *     },
 *     datetime: {
 *       type: Date,
 *       required: true,
 *     },
 *     date: {
 *       type: Date,
 *       required: true,
 *     },
 *     dateweek: {
 *       type: Date,
 *       required: true,
 *     },
 *     market_value_in_eur: {
 *       type: Number,
 *       required: true,
 *     },
 *
 *     current_club_id: {
 *       type: Number,
 *       required: true,
 *     },
 *     player_club_domestic_competition_id: {
 *       type: Number,
 *       required: true,
 *     },
 *   }
 */

const playerValuationSwaggerSchema = {
    type: 'object',
    properties: {
        player_id: {
        type: 'string',
        description: 'Player id of the player valuation',
        example: '5f9d1b4b2f6f1f0e5c1d7a0a',
        },
        last_season: {
        type: 'number',
        description: 'Last season of the player valuation',
        example: 2020,
        },
        datetime: {
        type: 'string',
        format: 'date-time',
        description: 'Datetime of the player valuation',
        example: '2020-12-12T00:00:00.000Z',
        },
        date: {
        type: 'string',
        format: 'date',
        description: 'Date of the player valuation',
        example: '2020-12-12T00:00:00.000Z',
        },
        dateweek: {
        type: 'string',
        format: 'date',
        description: 'Dateweek of the player valuation',
        example: '2020-12-12T00:00:00.000Z',
        },
        market_value_in_eur: {
        type: 'number',
        description: 'Market value in eur of the player valuation',
        example: 1000000,
        },
        current_club_id: {
        type: 'number',
        description: 'Current club id of the player valuation',
        example: 1,
        },
        player_club_domestic_competition_id: {
        type: 'number',
        description: 'Player club domestic competition id of the player valuation',
        example: 1,
        },
    },

}

module.exports = {playerValuationSwaggerSchema};