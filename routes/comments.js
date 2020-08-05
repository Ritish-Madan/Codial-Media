// Importing express files
const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentController = require('../controllers/comments');

router.post('/create', passport.checkAuthentication, commentController.create);
router.get('/destroy/', passport.checkAuthentication, commentController.destroy);

module.exports = router;