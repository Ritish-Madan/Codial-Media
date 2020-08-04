// Importing express files
const express = require('express');
const router = express.Router();

// Importing passport
const passport = require('passport');

// importing user controller
const userController = require('../controllers/userController');

// Routers for user activities
router.post('/register', userController.createUser);
<<<<<<< HEAD
router.get('/profile/:id', passport.checkAuthentication ,userController.profile);
=======
router.get('/profile', passport.checkAuthentication ,userController.profile);
>>>>>>> 759e38268171e3d51d37d664cc99413c3c210cf4
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/sign-in'},
),userController.createSession);
router.get('/logout', userController.destroySession);
<<<<<<< HEAD
router.post('/update/:id', passport.checkAuthentication, userController.update);
=======
>>>>>>> 759e38268171e3d51d37d664cc99413c3c210cf4

module.exports = router;