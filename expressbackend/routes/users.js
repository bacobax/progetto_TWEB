const express = require('express');
const { createUser, getAllUser, getOneUser } = require('../controllers/user');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router.route('/').get(getAllUser).post(createUser);
router.route('/:id').get(getOneUser);

module.exports = router;
