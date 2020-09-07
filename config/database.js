const mongoose = require('mongoose');
const env = require('../config/enviroment');

mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to database successfully');
});

module.exports = db;