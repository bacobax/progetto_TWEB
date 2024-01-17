const express = require('express');
const { createUser, getAllUser, getOneUser } = require('../controllers/user');
const {
  signup,
  login,
  forgotPassword,
  resetPassword, protect,
} = require('../controllers/special/authController');

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:token', resetPassword);

router.route('/:id').get(protect, getOneUser);

module.exports = router;
