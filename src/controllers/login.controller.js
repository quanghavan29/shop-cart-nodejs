const User = require('../models/user.model');
const session = require('express-session');
const bcrypt = require('bcryptjs');

exports.get = async function (req, res) {
    res.render('auth/login', {
        layout: false,
    });
}

exports.login = async function (req, res) {
    const email = req.body.email;
    const user = await User.findByEmail(email);
    if (user.length > 0) {
        if (bcrypt.compareSync(req.body.password, user[0].password)) {
            req.session.isAuthenticated = true;
            req.session.authUser = user[0];
            res.redirect('/home');
        } else {
            res.render('auth/login', {
                layout: false,
                loginFail: true,
            });
        }
    } else {
        res.render('auth/login', {
            layout: false,
            loginFail: true,
        });
    }
}