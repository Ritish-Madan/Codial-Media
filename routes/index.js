// Imported the express and routers file
const express = require('express');
const router = express.Router();

// Importing the controller file
const homeController = require('../controllers/homepage');

router.get('/', homeController.home);
router.get('/registration', homeController.registration);
router.get('/sign-in', homeController.check);
router.use('/user', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));

module.exports = router