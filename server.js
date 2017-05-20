var express = require('express');
var bodyParser = require('body-parser');
var config = require('./env/config').config;
var router = require('router');
var routes = require('./apis/routes');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router());

routes(app);

app.get('/env', function (req, res) {
    res.json({ env: app.get('env') });
});

process.on('uncaughtException', function (err) {
    console.log(err);
});

app.listen(config.port, function () {
    console.log(app.settings.env + ';__dirname:' + __dirname + ';');
    console.log('app is running on : ' + this.address().port);
});