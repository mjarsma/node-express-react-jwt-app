"use strict";
/**
 * Route handler for '/', either show registration page or dashboard
 */
var Express = require('express'),
    React = require('react/addons');

var router = Express.Router();


router.get('/', function (req, res, next) {
    if (!req.user) {
        /* User is not logged in */
        res.render('landing.ejs');
    } else {
        /* User is logged in */
        res.render('app.ejs');
    }
});

module.exports = router;
