/*
Passport acts as a strategy for authentication and jwt helps
to provide secure and valid session once a user has logged in.
*/
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
var User    = require('./../models/user');
// get db config file
var config  = require('./../config/database');

module.exports = function(passport){
    var opts = {
        // secretOrKey is a required string or buffer containing the secret (symmetric)
        // or PEM-encoded public key (asymmetric) for verifying the token's signature.
        secretOrKey: config.secret,
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        issuer: "brush-pass",
        passReqToCallback: false
    };
    passport.use(new JwtStrategy(opts, function(jwt_payload, done){
        User.findOne({id: jwt_payload.id}, function(err, user){
            if(err) { return done(err, false); }
            if(user) { done(null, user); }
            else { done(null, false); }
        });
    }));
};
