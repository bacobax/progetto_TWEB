/**
 * SwaggerUI docs schema for this mongoose schema:
 * {
 *   game_id: {
 *     type: mongoose.Types.ObjectId,
 *     ref: 'Game',
 *     required: true,
 *   },
 *   club_id: {
 *     type: Number,
 *     required: true,
 *   },
 *   type: {
 *     type: String,
 *     required: true,
 *     enum: LINEUP_TYPES,
 *   },
 *   number: {
 *     type: String,
 *     required: true,
 *   },
 *   player_id: {
 *     type: mongoose.Types.ObjectId,
 *     ref: 'Player',
 *     required: true,
 *   },
 *   player_name: {
 *     type: String,
 *     required: true,
 *   },
 *   team_captain: {
 *     type: Boolean,
 *     required: true,
 *   },
 *   position: {
 *     type: String,
 *     required: true,
 *     enum: LINEUP_POSITIONS,
 *   },
 * }
 */

const gameLineupSwaggerSchema = {
    type: 'object',
    properties: {
        game_id: {
            type: 'string',
            description: 'Game id of the game lineup',
            example: '5f9d1b4b2f6f1f0e5c1d7a0a',
        },
        club_id: {
            type: 'number',
            description: 'Club id of the game lineup',
            example: 1,
        },
        type: {
            type: 'string',
            description: 'Type of the game lineup',
            example: 'Starting Lineup',
        },
        number: {
            type: 'string',
            description: 'Number of the game lineup',
            example: '10',
        },
        player_id: {
            type: 'string',
            description: 'Player id of the game lineup',
            example: '5f9d1b4b2f6f1f0e5c1d7a0a',
        },
        player_name: {
            type: 'string',
            description: 'Player name of the game lineup',
            example: 'Lionel Messi',
        },
        team_captain: {
            type: 'boolean',
            description: 'Team captain of the game lineup',
            example: false,
        },
        position: {
            type: 'string',
            description: 'Position of the game lineup',
            example: 'Forward',
        },
    },

}

module.exports = {gameLineupSwaggerSchema};