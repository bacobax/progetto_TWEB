/**
 * SwaggerUI docs schema for this mongoose schema:
 * {
 *     competition_id: {
 *       type: String,
 *       required: true,
 *     },
 *     season: {
 *       type: String,
 *       required: [true, 'Season is required'],
 *     },
 *     round: {
 *       type: String,
 *       required: [true, 'Round is required'],
 *     },
 *     date: {
 *       type: Date,
 *       required: [true, 'Date is required'],
 *     },
 *     home_club_id: {
 *       type: Number,
 *       required: [true, 'Home club id is required'],
 *     },
 *     away_club_id: {
 *       type: Number,
 *       required: [true, 'Away club id is required'],
 *     },
 *     home_club_goals: {
 *       type: Number,
 *       required: [true, 'Home club goals is required'],
 *     },
 *     away_club_goals: {
 *       type: Number,
 *       required: [true, 'Away club goals is required'],
 *     },
 *     home_club_position: {
 *       type: Number,
 *       required: false,
 *       default: -1,
 *     },
 *     away_club_position: {
 *       type: Number,
 *       required: false,
 *       default: -1,
 *     },
 *
 *     stadium: {
 *       type: String,
 *       required: false,
 *       default: '',
 *     },
 *     attendance: {
 *       type: Number,
 *       required: false,
 *       default: -1,
 *     },
 *     referee: {
 *       type: String,
 *       default: '',
 *       required: false,
 *     },
 *     url: {
 *       type: String,
 *       required: [true, 'Url is required'],
 *     },
 *     home_club_formation: {
 *       type: String,
 *       default: '',
 *       required: false,
 *     },
 *     away_club_formation: {
 *       type: String,
 *       default: '',
 *       required: false,
 *     },
 *     home_club_name: {
 *       type: String,
 *       required: false,
 *       default: '',
 *     },
 *     away_club_name: {
 *       type: String,
 *       required: false,
 *       default: '',
 *     },
 *     aggregate: {
 *       type: String,
 *       required: [true, 'Aggregate is required'],
 *       validate: aggregateValidation,
 *     },
 *     competition_type: {
 *       type: String,
 *       required: [true, 'Competition type is required'],
 *       enum: COMPETITION_TYPES,
 *     },
 *   }
 */

const gameSwaggerSchema = {
    type: 'object',
    properties: {
        competition_id: {
            type: 'string',
            required: true,
        },
        season: {
            type: 'string',
            required: true,
        },
        round: {
            type: 'string',
            required: true,
        },
        date: {
            type: 'string',
            required: true,
        },
        home_club_id: {
            type: 'number',
            required: true,
        },
        away_club_id: {
            type: 'number',
            required: true,
        },
        home_club_goals: {
            type: 'number',
            required: true,
        },
        away_club_goals: {
            type: 'number',
            required: true,
        },
        home_club_position: {
            type: 'number',
            required: false,
            default: -1,
        },
        away_club_position: {
            type: 'number',
            required: false,
            default: -1,
        },
        stadium: {
            type: 'string',
            required: false,
            default: '',
        },
        attendance: {
            type: 'number',
            required: false,
            default: -1,
        },
        referee: {
            type: 'string',
            default: '',
            required: false,
        },
        url: {
            type: 'string',
            required: true,
        },
        home_club_formation: {
            type: 'string',
            default: '',
            required: false,
        },
        away_club_formation: {
            type: 'string',
            default: '',
            required: false,
        },
        home_club_name: {
            type: 'string',
            required: false,
            default: '',
        },
        away_club_name: {
            type: 'string',
            required: false,
            default: '',
        },
        aggregate: {
            type: 'string',
            required: true,
        },
        competition_type: {
            type: 'string',
            required: true,
        },
    },
}

module.exports = {gameSwaggerSchema}