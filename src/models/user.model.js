const db = require('../utils/db')

const User = function(user) {
    this.id = user.id;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.dob = user.dob;
    this.address = user.address;
    this.password = email.password;
    this.role = user.role;
}

module.exports = User;

// User.findByEmail = async function(email) {
//     const result = await db.load('SELECT COUNT(*) AS count FROM _user WHERE email = \'' + email + '\'');
//     return result[0].count;
// }

User.findByEmail = function(email) {
    return db.load('SELECT * FROM _user WHERE email = \'' + email + '\'');
}


User.add = function(user) {
    const table = '_user'
    db.add(table, user);
}