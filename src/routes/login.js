/**
 * Route handler for '/', either show registration page or dashboard
 */
var bcrypt = require('bcrypt');
var Express = require('express');
var Passport = require('passport');
var React = require('react/addons');

var User = require('./../models/user');

var router = Express.Router();

router.get('/', function (req, res, next) {
    if (!req.user) {
        /* User is not logged in */
        res.render('loginregister.ejs', {screen: 'login'});
    } else {
        /* User is logged in */
        res.redirect('/');
    }
});

/* API for logging in */
router.post('/', Passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false
}));

module.exports = router;
