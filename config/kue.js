const kue = require('kue'); /* Importing Kue lib */
const queue = kue.createQueue(); 


module.exports = queue;