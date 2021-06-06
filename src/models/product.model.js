const db = require("../utils/db");

const Product = function (product) {
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.image = product.image;
}

module.exports = Product;

Product.findAll = function(limit, offset) {
    return db.load('SELECT * FROM product LIMIT ' + limit + ' OFFSET ' + offset);
}

Product.findByCategory = function(category_id) {
    return db.load('SELECT * FROM product WHERE category_id = ' + category_id);
}

Product.findById = function(id) {
    return db.load('SELECT * FROM product WHERE id = ' + id);
}

Product.count = async function() {
    const result = await db.load('SELECT COUNT(*) AS total FROM product');
    return result[0].total;
}