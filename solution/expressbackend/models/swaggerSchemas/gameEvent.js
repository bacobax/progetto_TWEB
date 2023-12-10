/**
 * SwaggerUI docs schema for this mongoose schema:
 * {
 *   date: {
 *     type: Date,
 *     required: true,
 *   },
 *   game_id: {
 *     type: mongoose.Types.ObjectId,
 *     ref: 'Game',
 *     required: true,
 *   },
 *   minute: {
 *     type: Number,
 *     required: true,
 *   },
 *   type: {
 *     type: String,
 *     required: true,
 *     enum: ['Cards', 'Goals', 'Substitutions', 'Shootout'],
 *   },
 *   club_id: {
 *     type: Number,
 *     required: true,
 *   },
 *   player_id: {
 *     type: mongoose.Types.ObjectId,
 *     ref: 'Player',
 *     required: true,
 *   },
 *   description: String,
 *   player_in_id: {
 *     type: mongoose.Types.ObjectId,
 *     ref: 'Player',
 *     required: false,
 *   },
 *   player_assist_id: {
 *     type: mongoose.Types.ObjectId,
 *     ref: 'Player',
 *     required: false,
 *   },
 * }
 */

const gameEventSwaggerSchema = {

    type: 'object',
    properties: {
        date: {
            type: 'string',
            format: 'date',
            description: 'Date of the game event',
            example: '2020-12-12T00:00:00.000Z',
        },
        game_id: {
            type: 'string',
            description: 'Game id of the game event',
            example: '5f9d1b4b2f6f1f0e5c1d7a0a',
        },
        minute: {
            type: 'number',
            description: 'Minute of the game event',
            example: 12,
        },
        type: {
            type: 'string',
            description: 'Type of the game event',
            example: 'Cards',
            enum: ['Cards', 'Goals', 'Substitutions', 'Shootout'],
        },
        club_id: {
            type: 'number',
            description: 'Club id of the game event',
            example: 1,
        },
        player_id: {
            type: 'string',
            description: 'Player id of the game event',
            example: '5f9d1b4b2f6f1f0e5c1d7a0a',
        },
        description: {
            type: 'string',
            description: 'Description of the game event',
            example: 'Description of the game event',
        },
        player_in_id: {
            type: 'string',
            description: 'Player in id of the game event',
            example: '5f9d1b4b2f6f1f0e5c1d7a0a',
        },
        player_assist_id: {
            type: 'string',
            description: 'Player assist id of the game event',
            example: '5f9d1b4b2f6f1f0e5c1d7a0a',
        },
    },

}

module.exports = {gameEventSwaggerSchema};