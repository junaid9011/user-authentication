const express = require('express');
const router = express.Router();
const passport = require('passport');
const { signup, login, getUserProfile, refreshToken, logout } = require('../Controller/user.controller');
const roleAuth = require('../Middleware/roleAuth');
const loginLimiter = require('../Middleware/rateLimit');

router.post('/register', signup);
router.post('/login',loginLimiter, login);
router.post('/refresh-token',refreshToken);
router.post('/logout',logout);
router.get('/me',passport.authenticate('jwt', { session: false }),roleAuth('user'), getUserProfile);



module.exports = router;