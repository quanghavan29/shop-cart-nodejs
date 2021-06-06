const db = require('../utils/db');

const Category = function (category) {
    this.id = category.id;
    this.name = category.name;
}

module.exports = Category;

Category.findAll = function () {
    return db.load("SELECT * FROM category");
}
