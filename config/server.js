var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

app.use(expressSession({
    secret: '24cacf5004bf68ae9daad19a5bba391d85ad1cb0b31366e89aec86fad0ab16cb',
    resave: false,
    saveUninitialized: false
}));

consign()
	.include('app/routes')
	.then('config/dbConnection.js')
	.then('app/models')
	.then('app/controllers')
	.into(app);

module.exports = app;
