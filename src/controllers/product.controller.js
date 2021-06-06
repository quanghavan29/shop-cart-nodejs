const Product = require('../models/product.model');
const Category = require('../models/category.model');
const db = require('../utils/db');

exports.findByCategory = async function (req, res) {

    // get param of category id
    const category_id = parseInt(req.query.category_id)

    // get all category
    const categories = await Category.findAll();
    // set Active for selected category
    for(const c of categories) {
        if (c.id === category_id) {
            c.isActive = true;
        }
    }

    // get all product by category
    const products = await Product.findByCategory(category_id);
    // console.log(products);

    res.render('home', {
        layout: false,
        categories: categories,
        products: products,
        empty: products.length == 0,
        active: true,
    })
}

exports.findById = async function (req, res) {
    const id = parseInt(req.query.id);
    // get product by id (product detail)
    const product = await Product.findById(id);
    console.log(product);
    res.render('product/detail', {
        layout: false,
        product: product,
    });
}