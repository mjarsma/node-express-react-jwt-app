'use strict';
/*
 * passport.js - Initialize passport and provide helper methods
 */

var
    passport = require('passport'),
    User = require('../schemas/user'),
    LocalStrategy = require('passport-local').Strategy,
    configPassport;

/*
 * Public method used to bootstrap passport.
 *
 * - Setup middleware
 * - Serialize/Deserialize users
 * - Setup strategies
 */
configPassport = function (app) {
    // Setup middleware
    app.use(passport.initialize());
    app.use(passport.session());

    // Serialize/Deserialize users
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    // Setup Strategies
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function (email, password, done) {
            User.findOne({email: email}, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, {message: 'Incorrect username.'});
                }
                user.validPassword(password, function () {
                    return done(null, user);
                }, function () {
                    return done(null, false, {message: 'Incorrect password.'});
                });
            });
        }
    ));
};

module.exports = {
    configPassport: configPassport
};
