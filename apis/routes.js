var user = require('./user/usersService');

module.exports = function (app) {
   app.use('/api/v1/user', user);
};