const express = require('express');
const router = express.Router();

const likeController = require('../controllers/likes_conroller');

router.get('/toggle', likeController.like);

module.exports = router;