const Product = require('../models/product.model');
const session = require('express-session');
const db = require('../utils/db');

exports.load = async function (req, res) {
    // get page request from client
    const page = parseInt(req.query.page) || 1

    const limit = 8;
    const offset = (page - 1) * limit;

    const [products, count] = await Promise.all([
        // get all product and pagging
        Product.findAll(limit, offset),
        // count number of product
        Product.count(),
    ])

    // // count number of product
    // const count = await Product.count();
    // total page
    const totalPage = Math.ceil(count / limit);

    const page_items = [];
    for (let i = 1; i <= totalPage; i++) {
        const item = {
            value: i,
            isActive: i === page
        }
        page_items.push(item);
    }
    // // get all product and pagging
    // const products = await Product.findAll(limit, offset);
    products.map(function (p) {
        p.f_price = '$' + p.price + '.00';
    });

    res.render('home', {
        layout: false,
        products: products,
        empty: products.length == 0,
        home: true,
        page_items: page_items,
        isprev: page > 1,
        prev_page: page - 1,
        isnext: page < totalPage,
        next_page: page + 1,
    });
}