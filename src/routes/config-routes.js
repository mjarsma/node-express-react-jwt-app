/**
 * Route Configuration. Imports all routers and sets the up on their paths
 */
var error = require('./error');
var index = require('./index');
var login = require('./login');
var register = require('./register');


var configRoutes = function (app) {
    app.use('/', index);
    app.use('/login', login);
    app.use('/register', register);

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
    app.use(error.catchAll);
    if (app.get('env') === 'development') {
        app.use(error.errorDev);
    }
    app.use(error.errorProd);
};

module.exports = {
    configRoutes: configRoutes
};
