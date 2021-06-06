const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.get = async function (req, res) {
    res.render('auth/register', {
        layout: false,
        register: true,
    });
}

exports.post = async function (req, res) {
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        dob: req.body.dob,
        role: 'ROLE_USER'
    };
    const email = req.body.email;
    const result = await User.findByEmail(email);
    if (result.length > 0) {
        res.render('auth/register', {
            layout: false,
            accountExist: true,
            user: user,
        })
    } else {
        const password_hash = bcrypt.hashSync(req.body.password, 8);
        user.email = email;
        user.password = password_hash;
        User.add(user);
        res.render('auth/login', {
            layout: false,
            registerSuccess: true,
            user: user,
            password: req.body.password,
        });
    }
}