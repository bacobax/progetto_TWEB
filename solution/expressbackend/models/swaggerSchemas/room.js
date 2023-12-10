/**
 * SwaggerUI docs schema for this mongoose schema:
 * {
 *     name: {
 *         type: String,
 *         required: [true, 'A room must have a name'],
 *         unique: true,
 *         trim: true,
 *         maxlength: [40, 'A room name must have less or equal then 40 characters'],
 *     },
 *     description: {
 *         type: String,
 *         required: false,
 *     },
 *
 *     members: [
 *         {
 *             type: mongoose.Schema.ObjectId,
 *             ref: 'User',
 *         },
 *     ],
 *     messages: [
 *         {
 *             from: {
 *                 type: mongoose.Schema.ObjectId,
 *                 ref: 'User',
 *             },
 *             text: {
 *                 type: String,
 *                 required: [true, 'A message must have a text'],
 *             }
 *         }],
 *     createdAt: {
 *         type: Date,
 *         default: Date.now(),
 *         select: false,
 *     },
 *     admin: {
 *         type: mongoose.Schema.ObjectId,
 *         ref: 'User',
 *     }
 * }
 */

const roomSwaggerSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            description: 'Name of the room',
            example: 'Room 1',
        },
        description: {
            type: 'string',
            description: 'Description of the room',
            example: 'This is a room',
        },
        members: {
            type: 'array',
            items: {
                type: 'string',
                description: 'Member id of the room',
                example: '5f9d1b4b2f6f1f0e5c1d7a0a',
            },
        },
        messages: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    from: {
                        type: 'string',
                        description: 'From id of the message',
                        example: '5f9d1b4b2f6f1f0e5c1d7a0a',
                    },
                    text: {
                        type: 'string',
                        description: 'Text of the message',
                        example: 'Hello',
                    },
                },
            },
        },
        createdAt: {
            type: 'string',
            format: 'date',
            description: 'Date of the room creation',
            example: '2020-12-12T00:00:00.000Z',
        },
        admin: {
            type: 'string',
            description: 'Admin id of the room',
            example: '5f9d1b4b2f6f1f0e5c1d7a0a',
        },
    },
};

module.exports = {roomSwaggerSchema};