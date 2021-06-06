const session = require('express-session');

function restrict(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.redirect('/login');
    }

    next();
}

module.exports = restrict;