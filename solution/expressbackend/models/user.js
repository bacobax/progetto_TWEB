const mongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  surname: {
    type: String,
    required: [true, 'Please tell us your surname'],
  },
  email: {
    type: String,
    required: [true, 'Please tell us your surname'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    minlength: 8,
    validate: {
      //funziona solo con save o con create
      validator: function (el) {
        return el === this.password;
      },
      message: 'the two password must be equal',
    },
  },

  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  // 'age' : Number,
  // 'admin' : Boolean
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

/**
 * @function pre
 * @description This function is a mongoose middleware that runs before saving a user document. It checks if the password field has been modified. If it has, it hashes the password and sets the confirmPassword field to undefined.
 * @param {Function} next - The mongoose next function.
 * @returns {void}
 */
UserSchema.pre(/create|save/, async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;
  next();
});

/**
 * @method correctPassword
 * @description This method checks if the provided candidate password matches the user's password.
 * @param {String} candidatePassword - The candidate password.
 * @param {String} userPassword - The user's password.
 * @returns {Boolean} Returns true if the candidate password matches the user's password, false otherwise.
 */
UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

/**
 * @method changePasswordAfter
 * @description This method checks if the user's password has been changed after the provided JWT timestamp.
 * @param {Number} JWTTimestamp - The JWT timestamp.
 * @returns {Boolean} Returns true if the user's password has been changed after the JWT timestamp, false otherwise.
 */
UserSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimeStamp;
  }

  return false;
};

/**
 * @method createPasswordResetToken
 * @description This method creates a password reset token for the user. It generates a random token, hashes it, and sets it as the user's passwordResetToken. It also sets the passwordResetExpires field to 10 minutes from the current time.
 * @returns {String} Returns the generated reset token.
 */
UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);
  //10 minutes
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
const User = mongoose.model('User', UserSchema);
module.exports = User;
