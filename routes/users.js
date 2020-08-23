// Importing express files
const express = require('express');
const router = express.Router();

// Importing passport
const passport = require('passport');

// importing user controller
const userController = require('../controllers/userController');

// Routers for user activities
router.post('/register', userController.createUser);
router.get('/profile/:id', passport.checkAuthentication ,userController.profile);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/sign-in'},
),userController.createSession);
router.get('/logout', userController.destroySession);
router.post('/update/:id', passport.checkAuthentication, userController.update);
// Google OAuth route
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}))
router.get('/auth/google/callback', passport.authenticate(
    'google', 
    {failureRedirect: '/sign-in'}),
    userController.createSession);

// User forget Password
router.get('/forget-password', userController.forgetPage);
router.post('/forget-details', userController.resetPassword);
router.get('/reset-password', userController.newPassword);
router.post('/new_password', userController.updatePassword)

module.exports = router;