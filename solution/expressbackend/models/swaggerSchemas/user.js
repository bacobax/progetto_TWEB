/**
 * SwaggerUI docs schema for this mongoose schema:
 * {
 *   name: {
 *     type: String,
 *     required: [true, 'Please tell us your name'],
 *   },
 *   surname: {
 *     type: String,
 *     required: [true, 'Please tell us your surname'],
 *   },
 *   email: {
 *     type: String,
 *     required: [true, 'Please tell us your surname'],
 *     unique: true,
 *     lowercase: true,
 *     validate: [validator.isEmail, 'Please provide a valid email'],
 *   },
 *   role: {
 *     type: String,
 *     enum: ['user', 'admin'],
 *     default: 'user',
 *   },
 *   password: {
 *     type: String,
 *     required: [true, 'Please provide a password'],
 *     minlength: 8,
 *     select: false,
 *   },
 *   confirmPassword: {
 *     type: String,
 *     required: [true, 'Please confirm your password'],
 *     minlength: 8,
 *     validate: {
 *       //funziona solo con save o con create
 *       validator: function (el) {
 *         return el === this.password;
 *       },
 *       message: 'the two password must be equal',
 *     },
 *   },
 *
 *   passwordChangedAt: Date,
 *   passwordResetToken: String,
 *   passwordResetExpires: Date,
 *   // 'age' : Number,
 *   // 'admin' : Boolean
 * }
 */


const userSwaggerSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            description: 'Name of the user',
            example: 'John',
        },
        surname: {
            type: 'string',
            description: 'Surname of the user',
            example: 'Doe',
        },
        email: {
            type: 'string',
            description: 'Email of the user',
            example: 'example@example.com',
        },
        role: {
            type: 'string',
            description: 'Role of the user',
            example: 'user',
        },
        password: {
            type: 'string',
            description: 'Password of the user',
            example: 'password',
        },
        confirmPassword: {
            type: 'string',
            description: 'Confirm password of the user',
            example: 'password',
        },
}}

module.exports = {userSwaggerSchema};