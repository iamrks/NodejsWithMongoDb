var ENV = process.env.ENVIRONMENT || 'development';
var config = require('./application.config.json')[ENV];
module.exports.config = config;