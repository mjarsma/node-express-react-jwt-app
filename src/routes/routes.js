var express = require('express'),
    path = require('path'),
    jwt = require('jsonwebtoken'),
    utils = require('./../utils/utils'),
    rootPath = path.normalize(__dirname + '/../'),
    User = require('./../models/user'),
    router = express.Router();


module.exports = function(app) {

    // route middleware to verify a JWT token
    // all requests to this router will first hit this middleware
    router.use(function (req, res, next) {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        // decode token
        if(token){
            // verify secret and check exp
            jwt.verify(token, app.get('superSecret'), function (err, decoded) {
                if (err) {
                    return res.json({success: false, message: 'Failed to authenticate token.'});
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            // if there is no token, return an error
            return res.status(403).send({success: false, message: 'No token provided.'});
        }
    });

    // route to authenticate a user (POST http://localhost:8088/api/authenticate)
    router.post('/users/auth', function (req, res) {
        // find the user
        User.findOne({
            username: req.body.username },
            function (err, user) {
                if(err){ throw err; }
                if(!user) {
                    res.json({success: false, message: 'Authentication failed. User not found'});
                } else if (user) {
                    // check if password matches
                    utils.comparePwd(req.body.password, user.password).then(function(isMatch){
                        if(!isMatch){
                            res.json({success: false, message: 'Authentication failed: Incorrect password.'});
                        } else {
                            // Create token if passwords match and no error
                            var token = jwt.sign(user, config.secret, {
                                expiresInMinutes: 1440  // expires in 24 hrs
                            });
                            user.password = undefined;
                            // return the information including token as JSON
                            res.json({
                                success: true,
                                message: 'Enjoy!',
                                token: token,
                                user: user
                            });
                        }
                    });
                }
            });
    });

    // create a new user account (POST http://localhost:8088/signup)
    router.post('/users', function (req, res) {
        if (!req.body.username || !req.body.password) {
            res.json({success: false, message: 'Missing username or password.'});
        } else {
            utils.hashPwd(req.body.password).then(function(hashedPwd) {
                var newUser = new User({
                    username:   req.body.username,
                    password:   hashedPwd,
                    admin:      false
                });
                // save the user
                newUser.save(function(err){
                    if(err) throw err;

                    // create token
                    var token = jwt.sign(newUser, app.get('superSecret'), { expiresInMinutes: 1440 });
                    newUser.password = undefined;
                    // send token
                    res.json({
                        success: true,
                        message: 'Successfully authenticated!',
                        token: token,
                        user: newUser
                    });
                });
            });
        }
    });


    router.get('/players/id/:id', function (req, res) {
        Player.find({id: req.params.id}, function (err, player) {
            if (err) {
                res.send(err);
            }
            res.send(player);
        });
    });

    router.get('/players/', function (req, res, next) {
        utils.hashPwd(req.body.password).then(function(hashedPwd){
            var newUser = new User({
                username: req.body.username,
                password: hashedPwd,
                admin: false
            });
            newUser.save(function(err){
                if(err) throw err;

                // create token
                var token = jwt.sign(newUser, app.get('superSecret'), { expiresInminutes: 1440 });

                newUser.password = undefined;

                // send token
                res.json({
                    success: true,
                    message: 'Successfully authenticated!',
                    token: token,
                    user: newUser
                });
            });
        });
        Player.find({}, function (err, player) {
            if (err) {
                res.send(err);
            }
            res.json(player);
        });
    });

    router.get('/', function (req, res) {
        console.log(req);
        res.sendFile(__dirname + './src/index.html')
    });

    app.use('/', router);
};
