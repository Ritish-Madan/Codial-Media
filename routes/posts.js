// Importing express files
const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController = require('../controllers/posts');

router.post('/create', passport.checkAuthentication ,postController.create);
<<<<<<< HEAD
router.get('/destroy/:id', passport.checkAuthentication ,postController.destroy);
=======
>>>>>>> 759e38268171e3d51d37d664cc99413c3c210cf4

module.exports = router;