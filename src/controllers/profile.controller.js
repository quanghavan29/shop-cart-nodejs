const session = require('express-session');

exports.profile = async function(req, res) {
    res.send(req.session.authUser);
}