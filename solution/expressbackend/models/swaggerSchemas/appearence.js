/**
 * SwaggerUI docs schema for this mongoose schema:
 * {
 *   game_id: {
 *     type: mongoose.Types.ObjectId,
 *     ref: 'Game',
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
 *   player_club_id: {
 *     type: Number,
 *     required: true,
 *   },
 *   player_current_club_id: {
 *     type: Number,
 *     required: true,
 *   },
 *   date: {
 *     type: Date,
 *     required: true,
 *   },
 *   competition_id: {
 *     type: String,
 *     required: true,
 *   },
 *   yellow_cards: {
 *     type: Number,
 *     required: true,
 *   },
 *   red_cards: {
 *     type: Number,
 *     required: true,
 *   },
 *   goals: {
 *     type: Number,
 *     required: true,
 *   },
 *   assists: {
 *     type: Number,
 *     required: true,
 *   },
 *   minutes_played: {
 *     type: Number,
 *     required: true,
 *   },
 * }
 */

const appearenceSwaggerSchema = {
    type: 'object',
    properties: {
        game_id: {
        type: 'string',
        required: true,
        },
        player_id: {
        type: 'string',
        required: true,
        },
        player_name: {
        type: 'string',
        required: true,
        },
        player_club_id: {
        type: 'number',
        required: true,
        },
        player_current_club_id: {
        type: 'number',
        required: true,
        },
        date: {
        type: 'string',
        required: true,
        },
        competition_id: {
        type: 'number',
        required: true,
        },
        yellow_cards: {
        type: 'number',
        required: true,
        },
        red_cards: {
        type: 'number',
        required: true,
        },
        goals: {
        type: 'number',
        required: true,
        },
        assists: {
        type: 'number',
        required: true,
        },
        minutes_played: {
        type: 'number',
        required: true,
        },
    },

}

const params = [
        {
            name: 'page',
            in: 'query',
            description: 'page number',
            schema: {
                type: 'integer',
            },
        },
        {
            name: 'sort',
            in: 'query',
            description: 'sorting criteria',
            schema: {
                type: 'string',
            },
        },
        {
            name: 'limit',
            in: 'query',
            description: 'limit of appearances per page',
            schema: {
                type: 'integer',
            },
        },
        {
            name: 'fields',
            in: 'query',
            description: 'fields to show belongs to Appearance schema',
            schema: {
                type: 'string',
            },
        },
        {
            name: 'game_id',
            in: 'query',
            description: 'game_id of the appearance',
            schema: {
                type: 'string',

            },
        },
        // Add more parameters as needed following the same structure
        {
            name: 'player_id',
            in: 'query',
            description: 'player_id of the appearance',
            schema: {
                type: 'string',
            },
        },
        {
            name: 'player_name',
            in: 'query',
            description: 'player_name of the appearance',
            schema: {
                type: 'string',
            },
        },
        {
            name: 'player_club_id',
            in: 'query',
            description: 'player_club_id of the appearance',
            schema: {
                type: 'integer',
            },
        },
        {
            name: 'player_current_club_id',
            in: 'query',
            description: 'player_current_club_id of the appearance',
            schema: {
                type: 'integer',
            },
        },
        {
            name: 'date',
            in: 'query',
            description: 'date of the appearance',
            schema: {
                type: 'string',
            },
        },
        {
            name: 'competition_id',
            in: 'query',
            description: 'competition_id of the appearance',
            schema: {
                type: 'string',
            },
        },
        {
            name: 'yellow_cards',
            in: 'query',
            description: 'yellow_cards of the appearance',
            schema: {
                type: 'number',
            },
        },
        {
            name: 'red_cards',
            in: 'query',
            description: 'red_cards of the appearance',
            schema: {
                type: 'number',
            },
        },
        {
            name: 'goals',
            in: 'query',
            description: 'goals of the appearance',
            schema: {
                type: 'number',
            },
        },
        {
            name: 'assists',
            in: 'query',
            description: 'assists of the appearance',
            schema: {
                type: 'number',
            },
        },
        {
            name: 'minutes_played',
            in: 'query',
            description: 'minutes_played of the appearance',
            schema: {
                type: 'number',
            },
        },
    ];
module.exports = {appearenceSwaggerSchema, params};