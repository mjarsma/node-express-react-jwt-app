"use strict";
/*
 * server.js - entry point for the app
 *
 */

// Transparently require() jsx from node.
// require("node-jsx").install();

// Dependencies:
var express     = require("express"),
    bodyParser  = require('body-parser'),
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
    morgan      = require('morgan'),
    path        = require('path'),
    mongoose    = require('mongoose'),
    passport    = require('passport'),
    cors        = require('cors'),
    webpack     = require('webpack'),
    config      = require('./src/config/database');


// --- mongodb config  -------------
mongoose.connect(config.database);

/***
OLD: Load the players' data in JSON:
    var obj = JSON.parse(fs.readFileSync('./js/nhl_player_stats.json', 'utf8'));
    player.collection.insert(obj);

NEW: Use the following command in the CLI:
    use "mongoimport --db test --collection players --file [root] --jsonArray"
    to import batch json file

use db.players.drop() on test-db to drop the collection
***/

// pass passport for configuration
require('./src/config/passport')(passport);

// ---- express config -------------
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(__dirname + '/build'));
app.use(cors());
app.use(morgan('dev'));
app.use(passport.initialize());

// --- view engine config ---------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('superSecret', config.secret);  // secret variable

// ---- routes config -------------
require('./src/routes/routes')(app);

app.listen(config.httpPort);
console.log("listening port 8080");
