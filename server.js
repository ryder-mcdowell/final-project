var http = require("http");
var mydb = require("./db");
var express = require('express');
var script = require('./client/script.js')
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var User = require('./User.js');


var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));
app.use(session({
    cookieName: 'session',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    secret:"8hsk48sksney38diwnm098",
    resave: false,
    saveUninitialized: true
}));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})


app.post('/register', mydb.register);

app.post('/login', mydb.login);

app.get('/logout', mydb.logout);

app.get('/dashboard', mydb.dashboard);

app.get('/userData/:username', mydb.userData);

app.post('/post', mydb.post);

app.get('/postData', mydb.postData);

app.get('/myPostData', mydb.myPostData);


var server = app.listen(8080, function () {
    console.log("Server listening at"+ 8080);
})