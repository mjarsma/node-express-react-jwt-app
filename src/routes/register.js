/**
 * Route handler for '/', either show registration page or dashboard
 */
var bcrypt = require('bcrypt');
var Express = require('express');
var React = require('react/addons');

var User = require('../schemas/user');

var router = Express.Router();

router.get('/', function (req, res, next) {
    if (!req.user) {
        /* User is not logged in */
        res.render('loginregister.ejs', {screen: 'register'});
    } else {
        /* User is logged in */
        res.redirect('/');
    }
});

router.post('/', function (req, res) {
    User.find({email: req.body.email}, function (err, users) {
        if (err || users.length) {
            if(err) return res.status(500).send({error: err});
            return res.status(409).send('This email is already in use');
        } else {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                    req.body.password = hash;
                    var newUser = new User(req.body);
                    newUser.save(function(err, user){
                        if(err) return res.status(500).send({error: err});
                        res.status(201).send(user);
                    });
                });
            });

        }
    });
});

module.exports = router;
