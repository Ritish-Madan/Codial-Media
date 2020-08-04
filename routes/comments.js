// Importing express files
const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentController = require('../controllers/comments');

router.post('/create', passport.checkAuthentication, commentController.create);
<<<<<<< HEAD
router.get('/destroy/', passport.checkAuthentication, commentController.destroy);
=======
>>>>>>> 759e38268171e3d51d37d664cc99413c3c210cf4

module.exports = router;