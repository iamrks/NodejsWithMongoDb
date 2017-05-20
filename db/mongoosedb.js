var mongoose = require('mongoose');
var config = require('./../env/config').config;
var mongoUrl = 'mongodb://' + config.mongoose.user + ':' + 
                            config.mongoose.password + '@' + 
                            config.mongoose.host + ':' + 
                            config.mongoose.port + '/' + 
                            config.mongoose.dbName;
console.log(mongoUrl);
var db = mongoose.connect(
    mongoUrl,
    {
        server: {
            auto_reconnect: true
        }
    },
    function (err) {
        if (err) throw err;
    }
);

module.exports.db = db;